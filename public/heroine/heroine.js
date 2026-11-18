/* physics long｜3D 女主角巡場。取代原本的小貓，由 fx-addon.js 在需要時才載入。
 * 依賴：同資料夾的 engine.js（three.js + GLTFLoader + meshopt，提供 window.PetEngine）。
 * 對外介面：window.__heroine = { ready, enable(), disable(), say(text, ms), react(text) }
 */
(() => {
  if (window.__heroine) return;
  const E = window.PetEngine;
  const BASE = '/heroine/';

  const api = { ready: null, enable() {}, disable() {}, say() {}, react() {} };
  window.__heroine = api;
  if (!E) { api.ready = Promise.reject(new Error('PetEngine missing')); api.ready.catch(() => {}); return; }

  /* ---------- 樣式 ---------- */
  const st = document.createElement('style');
  st.id = 'fxHeroStyle';
  st.textContent = `
#fxHero{position:fixed;left:0;top:0;z-index:30;touch-action:none;user-select:none;-webkit-user-select:none;
  -webkit-tap-highlight-color:transparent;cursor:grab;will-change:transform;opacity:0;transition:opacity .4s;display:none}
#fxHero.on{display:block}
#fxHero.ready{opacity:1}
#fxHero.dragging{cursor:grabbing}
#fxHero .stage{position:absolute;inset:0}
#fxHero canvas{position:absolute;pointer-events:none}
#fxHero .sh{position:absolute;left:50%;bottom:-4px;height:14px;
  background:radial-gradient(ellipse at center,rgba(0,0,0,.28),rgba(0,0,0,0) 70%);
  transition:opacity .2s;pointer-events:none}
#fxHero.dragging .sh,#fxHero.fall .sh{opacity:0}
#fxHero .bub{position:absolute;bottom:calc(100% + 2px);left:0;width:max-content;max-width:210px;padding:8px 12px;
  border-radius:14px;background:var(--fx-card,var(--card,#fffcf7));border:1px solid var(--fx-line,var(--line,#e4ddd3));
  box-shadow:0 10px 28px rgba(37,54,45,.12);color:var(--fx-ink,var(--ink,#1a1916));
  font:400 .86rem/1.5 system-ui,-apple-system,"Noto Sans TC","PingFang TC","Microsoft JhengHei",sans-serif;
  opacity:0;transform:translateY(6px);transition:opacity .2s,transform .2s;pointer-events:none}
#fxHero .bub.on{opacity:1;transform:none}
#fxHero .bub:after{content:"";position:absolute;top:100%;left:var(--tail,24px);margin-left:-6px;
  border:6px solid transparent;border-top-color:var(--fx-card,var(--card,#fffcf7))}
@media (prefers-reduced-motion:reduce){#fxHero .bub{transition:none}}
@media print{#fxHero{display:none!important}}
`;
  document.head.appendChild(st);

  /* ---------- 設定 ---------- */
  const small = innerWidth < 600;
  const CFG = {
    CHAR_PX: small ? 170 : 230,  // 角色站立時的高度（像素）；手機版縮小一點
    WALK_TIMESCALE: 0.65,        // 走路動畫速度；移動速度會自動配合，腳不會溜冰
    STRIDE_MPS: 1.49,            // 原動畫在 1x 速度下的步幅速度（公尺/秒）
    IDLE_T: 0.517,               // 走路動畫中「兩腳交會」的時間點，拿來當站姿
    WALK_YAW: 1.25,              // 走路時身體轉向的角度（弧度）
    SCALE: 0.0106                // 模型單位（公分）轉公尺
  };
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const SIZE_MIN = 100, SIZE_MAX = 380;
  let k, W, H, CW, CH, PAD;
  /* 依「站立高度（像素）」算出各部位尺寸；傳 0 / 空值 = 預設大小 */
  function dims(px) {
    H = px ? clamp(Math.round(px), SIZE_MIN, SIZE_MAX) : CFG.CHAR_PX;
    k = H / 230;
    W = Math.round(90 * k);
    CW = Math.round(320 * k); CH = H + Math.round(60 * k); PAD = Math.round(12 * k);
  }
  dims(+window.__heroineSize || 0);
  const PHRASES = [
    '歡迎來到 physics long', 'F = ma', '你推牆，牆也推你，一樣大喔', '單擺的能量，動能和位能在互換',
    '今天看過實驗動畫了嗎？', '要不要聽一點音樂？', '牛頓說：慣性就是懶得改變', '把我拎起來看看吧'
  ];

  /* ---------- DOM ---------- */
  const pet = document.createElement('div');
  pet.id = 'fxHero';
  pet.setAttribute('aria-hidden', 'true');
  pet.innerHTML = '<div class="bub" id="fxHeroBub" role="status"></div><div class="stage"></div><div class="sh"></div>';
  document.body.appendChild(pet);
  const stage = pet.querySelector('.stage'), bub = pet.querySelector('.bub'), shadow = pet.querySelector('.sh');
  function layoutBox() {
    pet.style.width = W + 'px';
    pet.style.height = H + 'px';
    shadow.style.width = Math.round(78 * k) + 'px';
    shadow.style.marginLeft = -Math.round(39 * k) + 'px';
  }
  layoutBox();
  /* 載入完成前先只記錄大小；載入後由 init() 換成會即時調整畫布的版本 */
  api.setSize = px => { dims(px); layoutBox(); x = clamp(x, 0, Math.max(0, innerWidth - W)); y = floor(); };

  /* ---------- 狀態 ---------- */
  let enabled = false, loaded = false, raf = 0;
  let x = 0, y = 0, vy = 0;
  let dir = 1, state = 'idle', timer = 0, faceBack = false;
  let yaw = 0, blend = 1, swing = 0, grabDX = 0, grabDY = 0, lastPX = 0;
  let downX = 0, downY = 0, downT = 0, bubUntil = 0, last = 0, dragged = false, saidPickup = false;
  const floor = () => innerHeight - H;
  x = Math.max(0, innerWidth / 2 - W / 2); y = floor();

  function setState(s) {
    state = s;
    pet.classList.toggle('dragging', s === 'drag');
    pet.classList.toggle('fall', s === 'fall');
    pet.dataset.state = s;
    if (s !== 'drag') stage.style.transform = '';
  }
  function pickAction() {
    const r = Math.random();
    if (r < 0.6) { dir = Math.random() < 0.5 ? -1 : 1; timer = 2.5 + Math.random() * 5; faceBack = false; setState('walk'); }
    else { timer = 2 + Math.random() * 4; faceBack = r > 0.85; setState('idle'); }
  }

  /* ---------- 對話泡泡 ---------- */
  function placeBubble() {
    const bw = bub.offsetWidth;
    const left = clamp(x + W / 2 - bw / 2, 8, Math.max(8, innerWidth - bw - 8));
    bub.style.left = (left - x) + 'px';
    bub.style.setProperty('--tail', (x + W / 2 - left) + 'px');
  }
  /* ---------- 語音：真實年輕女聲音檔（自然甜美少女音）與自然合成備援 ---------- */
  const VOICE_MAP = {
    '歡迎來到 physics long': BASE + 'audio/welcome.mp3',
    '歡迎來到 physics long～': BASE + 'audio/welcome_wave.mp3',
    '我回來囉～': BASE + 'audio/back.mp3',
    'F = ma': BASE + 'audio/f_ma.mp3',
    '你推牆，牆也推你，一樣大喔': BASE + 'audio/wall.mp3',
    '單擺的能量，動能和位能在互換': BASE + 'audio/pendulum.mp3',
    '今天看過實驗動畫了嗎？': BASE + 'audio/experiment.mp3',
    '要不要聽一點音樂？': BASE + 'audio/music.mp3',
    '牛頓說：慣性就是懶得改變': BASE + 'audio/newton.mp3',
    '把我拎起來看看吧': BASE + 'audio/pickup.mp3',
    '不要鬧了!': BASE + 'audio/stop.mp3',
    '給我記住,好痛!': BASE + 'audio/pain.mp3',
    '給我記住，好痛!': BASE + 'audio/pain.mp3'
  };

  let currentAudio = null;
  let _voices = null;

  function pickVoice() {
    if (!('speechSynthesis' in window) || !window.speechSynthesis) return null;
    if (!_voices || !_voices.length) {
      try { _voices = window.speechSynthesis.getVoices(); } catch (e) { _voices = null; }
    }
    if (!_voices || !_voices.length) return null;
    const zh = _voices.filter((v) => /^zh([-_]|$)/i.test(v.lang || '') || /chinese|中文|國語/i.test(v.name || ''));
    // 優先挑選自然神經女聲（Natural / Neural / Online / Premium / Enhanced）
    const naturalFemale = zh.find((v) =>
      /(natural|neural|online|enhanced|premium)/i.test(v.name) &&
      /(hsiaochen|hsiaoyu|yating|mei-jia|szu-ching|曉臻|雅婷|美佳|曉雨)/i.test(v.name)
    );
    if (naturalFemale) return naturalFemale;

    const zhTwFemale = zh.find((v) =>
      /zh[-_]?tw/i.test(v.lang || '') &&
      !/hanhan|yunxi|desktop/i.test(v.name) &&
      /(fem|woman|girl|lady|女)/i.test(v.name)
    );
    return zhTwFemale || zh.find((v) => /zh[-_]?tw/i.test(v.lang || '')) || zh[0] || null;
  }

  if ('speechSynthesis' in window && window.speechSynthesis) {
    window.speechSynthesis.onvoiceschanged = () => { _voices = window.speechSynthesis.getVoices(); };
  }

  function speakSynthesisFallback(text, ms) {
    try {
      if ('speechSynthesis' in window && window.speechSynthesis) {
        const u = new window.SpeechSynthesisUtterance(text);
        const v = pickVoice();
        if (v) { u.voice = v; u.lang = v.lang || 'zh-TW'; } else { u.lang = 'zh-TW'; }
        u.volume = 1;
        u.rate = 1.02;   // 輕快、自然的少女語速
        u.pitch = 1.08;  // 微高但自然的清脆音調，消除 1.6 的變形機械感
        window.speechSynthesis.speak(u);
        const dur = Math.max(1200, Math.min(12000, (text.length || 1) * 200));
        bubUntil = performance.now() + dur;
        clearTimeout(say.t);
        say.t = setTimeout(() => bub.classList.remove('on'), dur);
      } else {
        bubUntil = performance.now() + ms;
        clearTimeout(say.t);
        say.t = setTimeout(() => bub.classList.remove('on'), ms);
      }
    } catch (e) {
      bubUntil = performance.now() + ms;
      clearTimeout(say.t);
      say.t = setTimeout(() => bub.classList.remove('on'), ms);
    }
  }

  function say(text, ms = 2800) {
    if (!enabled || !loaded) return;
    bub.textContent = text;
    bub.classList.add('on');
    placeBubble();

    const cleanKey = (text || '').trim();
    const audioUrl = VOICE_MAP[cleanKey] || VOICE_MAP[cleanKey.replace(/[～~！!？?]$/, '')];

    if (audioUrl) {
      if (currentAudio) {
        try { currentAudio.pause(); currentAudio.currentTime = 0; } catch (_) {}
      }
      const audio = new Audio(audioUrl);
      currentAudio = audio;
      audio.play().then(() => {
        const dur = Math.max(1600, ((audio.duration && !isNaN(audio.duration)) ? audio.duration : 2.4) * 1000 + 400);
        bubUntil = performance.now() + dur;
        clearTimeout(say.t);
        say.t = setTimeout(() => bub.classList.remove('on'), dur);
      }).catch(() => {
        // 若受瀏覽器 Autoplay 政策限制或音訊加載異常，無縫回退至調校後的自然 Web Speech
        speakSynthesisFallback(text, ms);
      });
      return;
    }

    speakSynthesisFallback(text, ms);
  }
  const react = text => say(text || PHRASES[Math.random() * PHRASES.length | 0]);

  /* ---------- 載入模型（載入後才建立場景） ---------- */
  async function init() {
    const loadTex = (url, srgb) => new Promise((res, rej) => {
      const t = new E.TextureLoader().load(url, () => res(t), undefined, rej);
      t.flipY = false; if (srgb) t.colorSpace = E.SRGBColorSpace;
    });
    const loader = new E.GLTFLoader().setMeshoptDecoder(E.MeshoptDecoder);
    const [buf, albedo, normal] = await Promise.all([
      fetch(BASE + 'hero.glb').then(r => { if (!r.ok) throw new Error('glb ' + r.status); return r.arrayBuffer(); }),
      loadTex(BASE + 'hero-albedo.jpg', true),
      loadTex(BASE + 'hero-normal.png', false)
    ]);
    const gltf = await new Promise((ok, ng) => loader.parse(buf, '', ok, ng));

    const model = gltf.scene;
    model.scale.setScalar(CFG.SCALE);
    const bones = [], skinned = [];
    model.traverse(o => {
      if (o.isBone) bones.push(o);
      if (o.isSkinnedMesh) {
        skinned.push(o); o.frustumCulled = false;
        (Array.isArray(o.material) ? o.material : [o.material]).forEach(m => { m.map = albedo; m.normalMap = normal; m.needsUpdate = true; });
      }
    });
    const bone = n => bones.find(b => b.name === n);
    const hips = bone('Hips'), spine = bone('Spine01');

    const yawGroup = new E.Group(); yawGroup.add(model);
    const scene = new E.Scene(); scene.add(yawGroup);
    scene.add(new E.HemisphereLight(0xffffff, 0x9aa4b8, 2.2));
    const sun = new E.DirectionalLight(0xffffff, 2); sun.position.set(2, 4, 3); scene.add(sun);

    /* 站姿：取走路動畫「兩腳交會」的一格，並讓右腿複製左腿 */
    const mixer = new E.AnimationMixer(model);
    const action = mixer.clipAction(gltf.animations[0]); action.play();
    mixer.setTime(CFG.IDLE_T);
    for (const n of ['UpLeg', 'Leg', 'Foot', 'ToeBase']) bone('Right' + n).quaternion.copy(bone('Left' + n).quaternion);
    const idlePose = bones.map(b => ({ b, p: b.position.clone(), q: b.quaternion.clone() }));

    /* 量出站姿的實際高度（含骨架變形），以腳底為地面 */
    model.updateMatrixWorld(true);
    let minY = 1e9, maxY = -1e9; const v = new E.Vector3();
    skinned.forEach(m => {
      m.skeleton.update();
      const n = m.geometry.attributes.position.count;
      for (let i = 0; i < n; i++) { m.getVertexPosition(i, v).applyMatrix4(m.matrixWorld); if (v.y < minY) minY = v.y; if (v.y > maxY) maxY = v.y; }
    });
    const hp = new E.Vector3(); hips.getWorldPosition(hp);
    model.position.set(-hp.x, -minY, -hp.z);
    const span = maxY - minY;
    let ppm = H / span;

    /* 渲染器（透明背景、正交鏡頭 → 像素大小精準） */
    const renderer = new E.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(CW, CH); renderer.setClearColor(0x000000, 0);
    const cv = renderer.domElement;
    const placeCanvas = () => { cv.style.cssText = `left:${-(CW - W) / 2}px;bottom:${-PAD}px;width:${CW}px;height:${CH}px`; };
    placeCanvas();
    stage.appendChild(cv);
    const cam = new E.OrthographicCamera(-CW / 2 / ppm, CW / 2 / ppm, (CH - PAD) / ppm, -PAD / ppm, 0.1, 50);
    cam.position.z = 10;

    let WALK_PX_PER_S = CFG.STRIDE_MPS * CFG.WALK_TIMESCALE * ppm;   // 地面速度 = 步幅速度 × 動畫速度
    const tmpQ = new E.Quaternion(), axisX = new E.Vector3(1, 0, 0);

    function frame(now) {
      raf = requestAnimationFrame(frame);
      const dt = Math.min(0.05, (now - last) / 1000); last = now;

      if (state === 'walk') {
        x += dir * WALK_PX_PER_S * dt;
        const maxX = innerWidth - W;
        if (x <= 0) { x = 0; dir = 1; }
        if (x >= maxX) { x = maxX; dir = -1; }
        if ((timer -= dt) <= 0) pickAction();
      } else if (state === 'idle') {
        if ((timer -= dt) <= 0) pickAction();
      } else if (state === 'fall') {
        vy += 2400 * dt; y += vy * dt;
        if (y >= floor()) { y = floor(); vy = 0; pickAction(); say('給我記住,好痛!'); }
      } else if (state === 'drag') {
        swing *= Math.pow(0.02, dt);
        stage.style.transformOrigin = '50% 0';
        stage.style.transform = `rotate(${clamp(swing, -18, 18)}deg)`;
      }

      const target = state === 'walk' ? dir * CFG.WALK_YAW : (state === 'idle' && faceBack ? Math.PI : 0);
      let d = target - yaw; d = Math.atan2(Math.sin(d), Math.cos(d));
      yaw += d * Math.min(1, dt * 7); yawGroup.rotation.y = yaw;

      const moving = state === 'walk' || state === 'drag';
      blend += ((moving ? 0 : 1) - blend) * Math.min(1, dt * 9);
      if (!moving && blend > 0.995) { blend = 1; action.time = CFG.IDLE_T; }
      action.timeScale = state === 'drag' ? 1.7 : CFG.WALK_TIMESCALE;
      mixer.update(dt);
      if (blend > 0) for (const s of idlePose) { s.b.quaternion.slerp(s.q, blend); s.b.position.lerp(s.p, blend); }
      if (blend > 0.5) { tmpQ.setFromAxisAngle(axisX, Math.sin(now / 1000 * 2.2) * 0.012 * blend); spine.quaternion.multiply(tmpQ); }

      pet.style.transform = `translate(${x}px,${y}px)`;
      if (bub.classList.contains('on')) placeBubble();
      renderer.render(scene, cam);
    }

    /* 即時調整大小：畫布、鏡頭、走路速度（腳才不會滑）、位置一起更新 */
    api.setSize = px => {
      const grounded = state !== 'drag' && state !== 'fall';
      dims(px); layoutBox();
      ppm = H / span;
      WALK_PX_PER_S = CFG.STRIDE_MPS * CFG.WALK_TIMESCALE * ppm;
      renderer.setSize(CW, CH); placeCanvas();
      cam.left = -CW / 2 / ppm; cam.right = CW / 2 / ppm; cam.top = (CH - PAD) / ppm; cam.bottom = -PAD / ppm;
      cam.updateProjectionMatrix();
      x = clamp(x, 0, Math.max(0, innerWidth - W));
      y = grounded ? floor() : Math.min(y, floor());
      if (bub.classList.contains('on')) placeBubble();
    };
    api.start = () => { cancelAnimationFrame(raf); last = performance.now(); raf = requestAnimationFrame(frame); };
    api.stop = () => cancelAnimationFrame(raf);
    loaded = true;
    setState('idle'); timer = 1.2;
  }

  /* ---------- 滑鼠 / 觸控拖曳 ---------- */
  pet.addEventListener('pointerdown', e => {
    if (!loaded) return;
    pet.setPointerCapture(e.pointerId);
    grabDX = e.clientX - x; grabDY = e.clientY - y; lastPX = e.clientX;
    downX = e.clientX; downY = e.clientY; downT = performance.now();
    saidPickup = false;
    bub.classList.remove('on');
    setState('drag'); e.preventDefault();
  });
  pet.addEventListener('pointermove', e => {
    if (state !== 'drag') return;
    swing -= (e.clientX - lastPX) * 0.7; lastPX = e.clientX;
    x = clamp(e.clientX - grabDX, 0, innerWidth - W);
    y = clamp(e.clientY - grabDY, 0, innerHeight - H);
    if (Math.hypot(e.clientX - downX, e.clientY - downY) >= 6) dragged = true;
    // 一離開地面（被拎到半空中）就說「不要鬧了!」
    if (y < floor() - 1 && !saidPickup) { saidPickup = true; say('不要鬧了!'); }
  });
  const release = e => {
    if (state !== 'drag') return;
    stage.style.transformOrigin = '';
    vy = 0;
    const moved = Math.hypot(e.clientX - downX, e.clientY - downY);
    const quick = performance.now() - downT < 450;
    if (moved < 6 && quick) {
      // 幾乎沒移動的短按 = 點一下，讓她說句話
      react();
      return;
    }
    // 在地板上拖動（沒拎起來）→ 放開時說「不要鬧了!」
    if (!saidPickup && (moved >= 6 || !quick)) { saidPickup = true; say('不要鬧了!'); }
    if (y < floor() - 1) setState('fall');
    else pickAction();
  };
  pet.addEventListener('pointerup', release);
  pet.addEventListener('pointercancel', release);
  addEventListener('resize', () => {
    x = Math.min(x, Math.max(0, innerWidth - W));
    if (state !== 'drag' && state !== 'fall') y = floor();
  });
  document.addEventListener('visibilitychange', () => { last = performance.now(); });

  /* ---------- 對外介面 ---------- */
  api.enable = () => {
    if (!loaded) return;
    enabled = true;
    if (state !== 'drag' && state !== 'fall') y = floor();
    pet.classList.add('on');
    void pet.offsetWidth;                 // 讓 opacity 轉場生效
    pet.classList.add('ready');
    api.start();
  };
  api.disable = () => {
    enabled = false;
    bub.classList.remove('on');
    if (api.stop) api.stop();
    if (currentAudio) {
      try { currentAudio.pause(); currentAudio.currentTime = 0; } catch (_) {}
      currentAudio = null;
    }
    if ('speechSynthesis' in window && window.speechSynthesis) {
      try { window.speechSynthesis.cancel(); } catch (_) {}
    }
    pet.classList.remove('ready', 'on');
  };
  api.say = say;
  api.react = react;
  api.ready = init();
  api.ready.catch(err => console.error('女主角載入失敗', err));
})();
