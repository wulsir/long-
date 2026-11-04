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
  const k = CFG.CHAR_PX / 230;
  const W = Math.round(90 * k), H = CFG.CHAR_PX;
  const CW = Math.round(320 * k), CH = H + Math.round(60 * k), PAD = Math.round(12 * k);
  const PHRASES = [
    '歡迎來到 physics long', 'F = ma', '你推牆，牆也推你，一樣大喔', '單擺的能量，動能和位能在互換',
    '今天看過實驗動畫了嗎？', '要不要聽一點音樂？', '牛頓說：慣性就是懶得改變', '把我拎起來看看吧'
  ];
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

  /* ---------- DOM ---------- */
  const pet = document.createElement('div');
  pet.id = 'fxHero';
  pet.setAttribute('aria-hidden', 'true');
  pet.style.width = W + 'px';
  pet.style.height = H + 'px';
  pet.innerHTML = '<div class="bub" id="fxHeroBub" role="status"></div><div class="stage"></div><div class="sh"></div>';
  document.body.appendChild(pet);
  const stage = pet.querySelector('.stage'), bub = pet.querySelector('.bub'), shadow = pet.querySelector('.sh');
  shadow.style.width = Math.round(78 * k) + 'px';
  shadow.style.marginLeft = -Math.round(39 * k) + 'px';

  /* ---------- 狀態 ---------- */
  let enabled = false, loaded = false, raf = 0;
  let x = Math.max(0, innerWidth / 2 - W / 2), y = innerHeight - H, vy = 0;
  let dir = 1, state = 'idle', timer = 0, faceBack = false;
  let yaw = 0, blend = 1, swing = 0, grabDX = 0, grabDY = 0, lastPX = 0;
  let downX = 0, downY = 0, downT = 0, bubUntil = 0, last = 0;
  const floor = () => innerHeight - H;

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
  function say(text, ms = 2800) {
    if (!enabled || !loaded) return;
    bub.textContent = text;
    bub.classList.add('on');
    placeBubble();
    bubUntil = performance.now() + ms;
    clearTimeout(say.t);
    say.t = setTimeout(() => bub.classList.remove('on'), ms);
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
    const ppm = CFG.CHAR_PX / (maxY - minY);

    /* 渲染器（透明背景、正交鏡頭 → 像素大小精準） */
    const renderer = new E.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(CW, CH); renderer.setClearColor(0x000000, 0);
    const cv = renderer.domElement;
    cv.style.cssText = `left:${-(CW - W) / 2}px;bottom:${-PAD}px;width:${CW}px;height:${CH}px`;
    stage.appendChild(cv);
    const cam = new E.OrthographicCamera(-CW / 2 / ppm, CW / 2 / ppm, (CH - PAD) / ppm, -PAD / ppm, 0.1, 50);
    cam.position.z = 10;

    const WALK_PX_PER_S = CFG.STRIDE_MPS * CFG.WALK_TIMESCALE * ppm;   // 地面速度 = 步幅速度 × 動畫速度
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
        if (y >= floor()) { y = floor(); vy = 0; pickAction(); }
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
    bub.classList.remove('on');
    setState('drag'); e.preventDefault();
  });
  pet.addEventListener('pointermove', e => {
    if (state !== 'drag') return;
    swing -= (e.clientX - lastPX) * 0.7; lastPX = e.clientX;
    x = clamp(e.clientX - grabDX, 0, innerWidth - W);
    y = clamp(e.clientY - grabDY, 0, innerHeight - H);
  });
  const release = e => {
    if (state !== 'drag') return;
    stage.style.transformOrigin = ''; vy = 0;
    if (y < floor() - 1) setState('fall'); else pickAction();
    // 幾乎沒移動的短按 = 點一下，讓她說句話
    if (e && e.type === 'pointerup' && Math.hypot(e.clientX - downX, e.clientY - downY) < 6 && performance.now() - downT < 450) react();
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
    pet.classList.remove('ready', 'on');
  };
  api.say = say;
  api.react = react;
  api.ready = init();
  api.ready.catch(err => console.error('女主角載入失敗', err));
})();
