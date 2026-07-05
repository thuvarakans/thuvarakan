import { useEffect, useRef, useState } from "react";

/**
 * 3D-feeling cursor: a lime accent ring that tilts in 3D based on pointer
 * velocity, plus a solid ink dot that snaps to the pointer. Grows and
 * inverts over interactive elements to match the site's UI language.
 */
export function Cursor3D() {
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    // Skip on touch / coarse pointers
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (!fine) return;
    setEnabled(true);

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;
    let prevX = mouseX;
    let prevY = mouseY;
    let tiltX = 0;
    let tiltY = 0;
    let hovering = false;
    let pressed = false;
    let raf = 0;

    const onMove = (e: PointerEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      const target = e.target as HTMLElement | null;
      hovering = !!target?.closest(
        'a, button, [role="button"], input, textarea, select, label, [data-cursor="hover"]',
      );
    };
    const onDown = () => (pressed = true);
    const onUp = () => (pressed = false);
    const onLeave = () => {
      if (ringRef.current) ringRef.current.style.opacity = "0";
      if (dotRef.current) dotRef.current.style.opacity = "0";
    };
    const onEnter = () => {
      if (ringRef.current) ringRef.current.style.opacity = "1";
      if (dotRef.current) dotRef.current.style.opacity = "1";
    };

    const tick = () => {
      // Smoothly trail the ring toward the pointer
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;

      // Derive 3D tilt from velocity (perpendicular to motion)
      const vx = mouseX - prevX;
      const vy = mouseY - prevY;
      prevX = mouseX;
      prevY = mouseY;
      const targetTiltY = Math.max(-28, Math.min(28, vx * 1.2));
      const targetTiltX = Math.max(-28, Math.min(28, -vy * 1.2));
      tiltX += (targetTiltX - tiltX) * 0.15;
      tiltY += (targetTiltY - tiltY) * 0.15;

      const scale = pressed ? 0.7 : hovering ? 1.9 : 1;

      if (ringRef.current) {
        ringRef.current.style.transform =
          `translate3d(${ringX - 18}px, ${ringY - 18}px, 0) ` +
          `perspective(400px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) ` +
          `scale(${scale})`;
        ringRef.current.style.borderColor = hovering
          ? "var(--color-foreground)"
          : "var(--color-accent)";
        ringRef.current.style.backgroundColor = hovering
          ? "color-mix(in oklab, var(--color-accent) 25%, transparent)"
          : "transparent";
      }
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX - 3}px, ${mouseY - 3}px, 0) scale(${pressed ? 1.6 : 1})`;
      }
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);
    raf = requestAnimationFrame(tick);

    // Hide native cursor on interactive surfaces too
    document.documentElement.style.cursor = "none";

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      document.documentElement.style.cursor = "";
    };
  }, []);

  if (!enabled) return null;

  return (
    <>
      <style>{`
        @media (pointer: fine) {
          html, body, a, button, input, textarea, select, label,
          [role="button"], [data-cursor="hover"] { cursor: none !important; }
        }
      `}</style>
      <div
        ref={ringRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-9 w-9 rounded-full border-2 mix-blend-difference"
        style={{
          borderColor: "var(--color-accent)",
          transformStyle: "preserve-3d",
          transition:
            "border-color 200ms ease, background-color 200ms ease, opacity 200ms ease",
          willChange: "transform",
          boxShadow:
            "0 8px 24px -8px color-mix(in oklab, var(--color-accent) 60%, transparent)",
        }}
      />
      <div
        ref={dotRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-1.5 w-1.5 rounded-full"
        style={{
          backgroundColor: "var(--color-foreground)",
          transition: "opacity 200ms ease, transform 120ms ease",
          willChange: "transform",
        }}
      />
    </>
  );
}
