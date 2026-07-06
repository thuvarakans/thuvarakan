import { useRef, type ReactNode } from "react";

/**
 * Interactive 3D text — letters tilt and lift based on cursor proximity.
 * Uses per-letter transforms driven by pointermove; runs on rAF for smoothness.
 * Respects prefers-reduced-motion and disables on coarse pointers.
 */
export function Hero3DText({
  text,
  accent,
  className = "",
}: {
  text: string;
  accent?: ReactNode;
  className?: string;
}) {
  const wrapRef = useRef<HTMLHeadingElement>(null);
  const lettersRef = useRef<HTMLSpanElement[]>([]);
  const frame = useRef(0);
  const target = useRef({ x: 0, y: 0, active: 0 });
  const current = useRef({ x: 0, y: 0, active: 0 });

  const setLetterRef = (el: HTMLSpanElement | null, i: number) => {
    if (el) lettersRef.current[i] = el;
  };

  const schedule = () => {
    if (frame.current) return;
    frame.current = requestAnimationFrame(() => {
      frame.current = 0;
      // ease current toward target
      current.current.x += (target.current.x - current.current.x) * 0.15;
      current.current.y += (target.current.y - current.current.y) * 0.15;
      current.current.active +=
        (target.current.active - current.current.active) * 0.12;

      const wrap = wrapRef.current;
      if (!wrap) return;
      const rect = wrap.getBoundingClientRect();

      for (const el of lettersRef.current) {
        if (!el) continue;
        const r = el.getBoundingClientRect();
        const cx = r.left + r.width / 2 - rect.left;
        const cy = r.top + r.height / 2 - rect.top;
        const dx = current.current.x - cx;
        const dy = current.current.y - cy;
        const dist = Math.hypot(dx, dy);
        const radius = Math.max(rect.width, 400) * 0.35;
        const falloff = Math.max(0, 1 - dist / radius) * current.current.active;

        const rotY = (dx / radius) * 22 * falloff;
        const rotX = (-dy / radius) * 22 * falloff;
        const tz = falloff * 40;
        const scale = 1 + falloff * 0.06;

        el.style.transform =
          `translateZ(${tz.toFixed(2)}px) ` +
          `rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg) ` +
          `scale(${scale.toFixed(3)})`;
      }

      if (
        Math.abs(target.current.x - current.current.x) > 0.5 ||
        Math.abs(target.current.y - current.current.y) > 0.5 ||
        Math.abs(target.current.active - current.current.active) > 0.005
      ) {
        schedule();
      }
    });
  };

  const onMove = (e: React.PointerEvent<HTMLHeadingElement>) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const rect = wrapRef.current!.getBoundingClientRect();
    target.current.x = e.clientX - rect.left;
    target.current.y = e.clientY - rect.top;
    target.current.active = 1;
    schedule();
  };

  const onLeave = () => {
    target.current.active = 0;
    schedule();
  };

  const chars = Array.from(text);
  let idx = 0;

  return (
    <h1
      ref={wrapRef}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className={className}
      style={{ perspective: "900px", transformStyle: "preserve-3d" }}
    >
      <span className="inline-block" style={{ transformStyle: "preserve-3d" }}>
        {chars.map((c) => {
          const i = idx++;
          return (
            <span
              key={i}
              ref={(el) => setLetterRef(el, i)}
              className="inline-block will-change-transform"
              style={{
                transformStyle: "preserve-3d",
                transition: "transform 120ms ease-out",
              }}
            >
              {c === " " ? "\u00A0" : c}
            </span>
          );
        })}
      </span>
      {accent ? (
        <span
          ref={(el) => setLetterRef(el, idx++)}
          className="inline-block will-change-transform text-accent"
          style={{
            transformStyle: "preserve-3d",
            transition: "transform 120ms ease-out",
          }}
        >
          {accent}
        </span>
      ) : null}
    </h1>
  );
}
