import { useEffect, useRef, useState } from "react";

export default function Cursor() {
  const dot = useRef(null);
  const ring = useRef(null);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    let ringX = 0, ringY = 0;
    let dotX = 0, dotY = 0;
    let raf;

    const onMove = (e) => {
      dotX = e.clientX;
      dotY = e.clientY;
      if (dot.current) {
        dot.current.style.left = `${dotX}px`;
        dot.current.style.top = `${dotY}px`;
      }
    };

    const animate = () => {
      ringX += (dotX - ringX) * 0.11;
      ringY += (dotY - ringY) * 0.11;
      if (ring.current) {
        ring.current.style.left = `${ringX}px`;
        ring.current.style.top = `${ringY}px`;
      }
      raf = requestAnimationFrame(animate);
    };

    const onEnter = () => setHovered(true);
    const onLeave = () => setHovered(false);

    window.addEventListener("mousemove", onMove);

    const attachHover = () => {
      document.querySelectorAll("a, button, [data-hover]").forEach((el) => {
        el.addEventListener("mouseenter", onEnter);
        el.addEventListener("mouseleave", onLeave);
      });
    };

    attachHover();
    const observer = new MutationObserver(attachHover);
    observer.observe(document.body, { childList: true, subtree: true });

    raf = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <div
        ref={dot}
        style={{
          position: "fixed",
          width: hovered ? 0 : 6,
          height: hovered ? 0 : 6,
          background: "#60a5fa",
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 99999,
          transform: "translate(-50%, -50%)",
          transition: "width 0.2s, height 0.2s",
          mixBlendMode: "screen",
        }}
      />
      <div
        ref={ring}
        style={{
          position: "fixed",
          width: hovered ? 54 : 34,
          height: hovered ? 54 : 34,
          border: `1.5px solid ${hovered ? "rgba(167,139,250,0.75)" : "rgba(96,165,250,0.5)"}`,
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 99998,
          transform: "translate(-50%, -50%)",
          transition:
            "width 0.35s cubic-bezier(.23,1,.32,1), height 0.35s cubic-bezier(.23,1,.32,1), border-color 0.3s",
          mixBlendMode: "screen",
        }}
      />
    </>
  );
}