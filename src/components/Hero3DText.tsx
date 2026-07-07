import { useRef, type ReactNode } from "react";

/**
 * Interactive 3D text — the whole word tilts with cursor position while each
 * letter lifts, rotates and casts a layered shadow based on cursor proximity.
 * Runs on rAF, respects prefers-reduced-motion, and disables on coarse pointers.
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
  const stageRef = useRef<HTMLSpanElement>(null);
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
      current.current.x += (target.current.x - current.current.x) * 0.15;
      current.current.y += (target.current.y - current.current.y) * 0.15;
      current.current.active +=
        (target.current.active - current.current.active) * 0.1;

      const wrap = wrapRef.current;
      const stage = stageRef.current;
      if (!wrap || !stage) return;
      const rect = wrap.getBoundingClientRect();

      // Global tilt of the whole word based on cursor position within the box.
      const nx = (current.current.x / rect.width - 0.5) * 2; // -1..1
      const ny = (current.current.y / rect.height - 0.5) * 2;
      const gRotY = nx * 12 * current.current.active;
      const gRotX = -ny * 8 * current.current.active;
      stage.style.transform =
        `rotateX(${gRotX.toFixed(2)}deg) rotateY(${gRotY.toFixed(2)}deg)`;

      for (const el of lettersRef.current) {
        if (!el) continue;
        const r = el.getBoundingClientRect();
        const cx = r.left + r.width / 2 - rect.left;
        const cy = r.top + r.height / 2 - rect.top;
        const dx = current.current.x - cx;
        const dy = current.current.y - cy;
        const radius = Math.max(r.width, r.height) * 2.4;
        const dist = Math.hypot(dx, dy);
        const falloff = Math.max(0, 1 - dist / radius) * current.current.active;

        const rotY = Math.max(-40, Math.min(40, (dx / (r.width * 0.6)) * 28 * falloff));
        const rotX = Math.max(-40, Math.min(40, (-dy / (r.height * 0.6)) * 28 * falloff));
        const tz = falloff * 110;
        const scale = 1 + falloff * 0.1;

        el.style.transform =
          `translateZ(${tz.toFixed(2)}px) ` +
          `rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg) ` +
          `scale(${scale.toFixed(3)})`;

        // Layered shadow gives real depth without changing the type color.
        const sx = (-nx * 6 - dx * 0.02) * falloff;
        const sy = (-ny * 6 - dy * 0.02) * falloff + falloff * 4;
        const blur = 8 + falloff * 22;
        el.style.textShadow =
          `${(sx * 0.4).toFixed(1)}px ${(sy * 0.4).toFixed(1)}px ${(blur * 0.5).toFixed(1)}px hsl(var(--accent) / ${(0.35 * falloff).toFixed(3)}), ` +
          `${sx.toFixed(1)}px ${sy.toFixed(1)}px ${blur.toFixed(1)}px hsl(var(--foreground) / ${(0.25 * falloff).toFixed(3)})`;
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
      style={{ perspective: "1100px", transformStyle: "preserve-3d" }}
    >
      <span
        ref={stageRef}
        className="inline-block"
        style={{
          transformStyle: "preserve-3d",
          transition: "transform 200ms ease-out",
          willChange: "transform",
        }}
      >
        {chars.map((c) => {
          const i = idx++;
          return (
            <span
              key={i}
              ref={(el) => setLetterRef(el, i)}
              className="inline-block will-change-transform"
              style={{
                transformStyle: "preserve-3d",
                transition: "transform 140ms ease-out, text-shadow 160ms ease-out",
              }}
            >
              {c === " " ? "\u00A0" : c}
            </span>
          );
        })}
        {accent ? (
          <span
            ref={(el) => setLetterRef(el, idx++)}
            className="inline-block will-change-transform text-accent"
            style={{
              transformStyle: "preserve-3d",
              transition: "transform 140ms ease-out, text-shadow 160ms ease-out",
            }}
          >
            {accent}
          </span>
        ) : null}
      </span>
    </h1>
  );
}
