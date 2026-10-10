const leaves = [
  { left: "4%", delay: "-4s", duration: "18s", size: 15, tone: 0, drift: 22, spin: 120 },
  { left: "18%", delay: "-11s", duration: "21s", size: 18, tone: 1, drift: -18, spin: -160 },
  { left: "33%", delay: "-7s", duration: "16s", size: 12, tone: 2, drift: 14, spin: 90 },
  { left: "47%", delay: "-15s", duration: "23s", size: 20, tone: 0, drift: -26, spin: 200 },
  { left: "61%", delay: "-2s", duration: "19s", size: 14, tone: 1, drift: 16, spin: -110 },
  { left: "74%", delay: "-9s", duration: "17s", size: 17, tone: 2, drift: -12, spin: 150 },
  { left: "88%", delay: "-13s", duration: "22s", size: 13, tone: 0, drift: 20, spin: -80 },
  { left: "26%", delay: "-18s", duration: "24s", size: 11, tone: 1, drift: -20, spin: 70 },
];

export function MapleField() {
  return (
    <div className="maple-layer" aria-hidden="true">
      {leaves.map((leaf) => (
        <span
          key={`${leaf.left}-${leaf.delay}`}
          className={`maple-leaf maple-${leaf.tone}`}
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
          <svg viewBox="0 0 64 64" fill="currentColor">
            <path d="M32 4c-1.4 8.5-7.2 11.8-13.6 9.6-1.2 6.2-6.8 8.6-12 11.8 6.4 2.2 10.2 6.4 10.8 12.2-6.4 2.6-8.4 9.8-5.2 16.2 7.2-2.6 11.4.4 14.2 6.4C28.2 56.4 30 60 32 62c2-2 3.8-5.6 5.8-9.8 2.8-6 7-9 14.2-6.4 3.2-6.4 1.2-13.6-5.2-16.2.6-5.8 4.4-10 10.8-12.2-5.2-3.2-10.8-5.6-12-11.8C39.2 15.8 33.4 12.5 32 4z" />
            <path d="M32 28v34" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
          </svg>
        </span>
      ))}
    </div>
  );
}
