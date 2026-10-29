import { useEffect, useRef, useState } from "react";

// Un point par personne, classés par date de décès
export default function DotsCanvas({ data, colorOf }) {
  const wrapRef = useRef(null);
  const canvasRef = useRef(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const ro = new ResizeObserver(([entry]) => setWidth(Math.floor(entry.contentRect.width)));
    ro.observe(wrapRef.current);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    if (!width) return;
    const cv = canvasRef.current;
    const dpr = window.devicePixelRatio || 1;
    const n = Math.max(data.length, 1);
    const step = Math.max(3, Math.min(10, Math.sqrt((width * 300) / n)));
    const cols = Math.max(1, Math.floor(width / step));
    const height = Math.ceil(n / cols) * step;

    cv.width = width * dpr;
    cv.height = height * dpr;
    cv.style.height = height + "px";
    const ctx = cv.getContext("2d");
    ctx.scale(dpr, dpr);

    const cache = {};
    [...data]
      .sort((a, b) => a.d.localeCompare(b.d))
      .forEach((r, i) => {
        ctx.fillStyle = cache[r.c] || (cache[r.c] = colorOf(r.c));
        ctx.beginPath();
        ctx.arc((i % cols) * step + step / 2, Math.floor(i / cols) * step + step / 2, step * 0.36, 0, Math.PI * 2);
        ctx.fill();
      });
  }, [data, width, colorOf]);

  return (
    <div ref={wrapRef}>
      <canvas
        ref={canvasRef}
        id="dots"
        role="img"
        aria-label="Nuage de points, un point par personne, coloré selon le conflit"
      />
    </div>
  );
}
