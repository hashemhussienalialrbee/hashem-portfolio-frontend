// Signature visual: soft topographic contour lines — a quiet nod to both
// "calm terrain" (the requested restful palette) and "data contour maps"
// (the analyst's own material: elevation = density of information).
export default function ContourBackground() {
  const lines = [
    "M-100,120 C150,60 350,180 600,110 C850,40 1050,140 1300,90",
    "M-100,180 C150,130 350,230 600,170 C850,110 1050,200 1300,150",
    "M-100,240 C150,200 350,280 600,230 C850,180 1050,260 1300,210",
    "M-100,300 C150,270 350,330 600,290 C850,250 1050,320 1300,270",
  ];
  return (
    <svg
      className="contour-bg"
      viewBox="0 0 1200 420"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      {lines.map((d, i) => (
        <path
          key={i}
          d={d}
          fill="none"
          stroke="var(--sage-400)"
          strokeWidth="1.4"
          style={{ opacity: 0.16 + i * 0.05 }}
        />
      ))}
    </svg>
  );
}
