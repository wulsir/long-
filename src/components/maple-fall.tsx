const LEAVES = [
  { left: "3%", delay: "-14s", duration: "18s", size: 18, tone: 0, drift: 28, spin: 140 },
  { left: "9%", delay: "-3s", duration: "22s", size: 14, tone: 1, drift: -22, spin: -180 },
  { left: "16%", delay: "-9s", duration: "16s", size: 22, tone: 2, drift: 16, spin: 90 },
  { left: "22%", delay: "-19s", duration: "20s", size: 16, tone: 0, drift: -30, spin: -220 },
  { left: "31%", delay: "-6s", duration: "24s", size: 12, tone: 1, drift: 24, spin: 160 },
  { left: "38%", delay: "-12s", duration: "17s", size: 20, tone: 2, drift: -14, spin: -110 },
  { left: "47%", delay: "-1s", duration: "21s", size: 15, tone: 0, drift: 32, spin: 200 },
  { left: "54%", delay: "-16s", duration: "19s", size: 18, tone: 1, drift: -26, spin: -150 },
  { left: "62%", delay: "-8s", duration: "23s", size: 13, tone: 2, drift: 18, spin: 80 },
  { left: "69%", delay: "-21s", duration: "15s", size: 21, tone: 0, drift: -20, spin: -190 },
  { left: "76%", delay: "-4s", duration: "20s", size: 16, tone: 1, drift: 26, spin: 170 },
  { left: "83%", delay: "-11s", duration: "18s", size: 14, tone: 2, drift: -16, spin: -90 },
  { left: "90%", delay: "-17s", duration: "22s", size: 19, tone: 0, drift: 12, spin: 130 },
  { left: "12%", delay: "-25s", duration: "26s", size: 11, tone: 1, drift: -34, spin: -240 },
  { left: "58%", delay: "-7s", duration: "25s", size: 17, tone: 2, drift: 20, spin: 100 },
  { left: "95%", delay: "-13s", duration: "16s", size: 15, tone: 0, drift: -12, spin: -160 },
  { left: "42%", delay: "-22s", duration: "19s", size: 13, tone: 1, drift: 14, spin: 210 },
  { left: "27%", delay: "-5s", duration: "21s", size: 18, tone: 2, drift: -24, spin: -130 },
] as const;

function MapleLeaf({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      aria-hidden="true"
      className={className}
      fill="currentColor"
    >
      <path d="M32 4c-1.4 8.5-7.2 11.8-13.6 9.6-1.2 6.2-6.8 8.6-12 11.8 6.4 2.2 10.2 6.4 10.8 12.2-6.4 2.6-8.4 9.8-5.2 16.2 7.2-2.6 11.4.4 14.2 6.4C28.2 56.4 30 60 32 62c2-2 3.8-5.6 5.8-9.8 2.8-6 7-9 14.2-6.4 3.2-6.4 1.2-13.6-5.2-16.2.6-5.8 4.4-10 10.8-12.2-5.2-3.2-10.8-5.6-12-11.8C39.2 15.8 33.4 12.5 32 4z" />
      <path d="M32 28v34" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  );
}

export function MapleFall() {
  return (
    <div className="maple-layer" aria-hidden="true">
      {LEAVES.map((leaf, index) => (
        <span
          key={index}
          className={`maple-leaf maple-leaf-${leaf.tone}`}
          style={{
            left: leaf.left,
            width: leaf.size,
            height: leaf.size,
            animationDelay: leaf.delay,
            animationDuration: leaf.duration,
            ["--maple-drift" as string]: `${leaf.drift}px`,
            ["--maple-spin" as string]: `${leaf.spin}deg`,
          }}
        >
          <MapleLeaf />
        </span>
      ))}
    </div>
  );
}
