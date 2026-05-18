import { useEffect, useRef, useState } from "react";

/* ─── Custom Cursor ─────────────────────────────────────────────────────── */
function Cursor() {
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
      ringX += (dotX - ringX) * 0.12;
      ringY += (dotY - ringY) * 0.12;
      if (ring.current) {
        ring.current.style.left = `${ringX}px`;
        ring.current.style.top = `${ringY}px`;
      }
      raf = requestAnimationFrame(animate);
    };

    const onEnter = () => setHovered(true);
    const onLeave = () => setHovered(false);

    window.addEventListener("mousemove", onMove);
    document.querySelectorAll("a, button, [data-hover]").forEach((el) => {
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
    });

    raf = requestAnimationFrame(animate);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div
        ref={dot}
        className="fixed bg-blue-400 rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 mix-blend-screen transition-[width,height] duration-200"
        style={{
          width: hovered ? 0 : 6,
          height: hovered ? 0 : 6,
        }}
      />
      <div
        ref={ring}
        className="fixed rounded-full pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 mix-blend-screen transition-all duration-300 ease-out"
        style={{
          width: hovered ? 56 : 36,
          height: hovered ? 56 : 36,
          border: `1.5px solid ${hovered ? "#a78bfa" : "#60a5fa88"}`,
        }}
      />
    </>
  );
}

/* ─── Particle Canvas ───────────────────────────────────────────────────── */
function ParticleCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let W = (canvas.width = window.innerWidth);
    let H = (canvas.height = window.innerHeight);
    let mouse = { x: W / 2, y: H / 2 };

    const N = 90;
    const particles = Array.from({ length: N }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      r: Math.random() * 1.8 + 0.5,
    }));

    const onResize = () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };
    const onMouse = (e) => { mouse.x = e.clientX; mouse.y = e.clientY; };
    window.addEventListener("resize", onResize);
    window.addEventListener("mousemove", onMouse);

    let raf;
    const draw = () => {
      ctx.clearRect(0, 0, W, H);

      particles.forEach((p) => {
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          p.vx += (dx / dist) * 0.04;
          p.vy += (dy / dist) * 0.04;
        }

        p.vx *= 0.995;
        p.vy *= 0.995;
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = W;
        if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H;
        if (p.y > H) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(96,165,250,0.7)";
        ctx.fill();
      });

      for (let i = 0; i < N; i++) {
        for (let j = i + 1; j < N; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 130) {
            const alpha = (1 - d / 130) * 0.25;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(96,165,250,${alpha})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      raf = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMouse);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full opacity-55"
    />
  );
}

/* ─── Glitch Text ───────────────────────────────────────────────────────── */
function GlitchText({ text }) {
  return (
    <span
      className="glitch-text relative inline-block"
      data-text={text}
    >
      {text}
    </span>
  );
}

/* ─── Typewriter ────────────────────────────────────────────────────────── */
const roles = [
  "a Software Developer.",
  "an ML Engineer.",
];

function Typewriter() {
  const [display, setDisplay] = useState("");
  const [roleIdx, setRoleIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) {
      const t = setTimeout(() => setPaused(false), 1400);
      return () => clearTimeout(t);
    }
    const current = roles[roleIdx];
    const speed = deleting ? 45 : 85;

    const t = setTimeout(() => {
      if (!deleting) {
        const next = current.slice(0, display.length + 1);
        setDisplay(next);
        if (next === current) { setPaused(true); setDeleting(true); }
      } else {
        const next = display.slice(0, -1);
        setDisplay(next);
        if (next === "") {
          setDeleting(false);
          setRoleIdx((i) => (i + 1) % roles.length);
        }
      }
    }, speed);
    return () => clearTimeout(t);
  }, [display, deleting, roleIdx, paused]);

  return (
    <span className="text-blue-400 font-medium">
      {display}
      <span className="inline-block w-[2px] h-[1.1em] bg-purple-400 ml-[4px] align-text-bottom animate-pulse" />
    </span>
  );
}

/* ─── Ambient Orbs ──────────────────────────────────────────────────────── */
function AmbientOrbs() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(79,70,229,0.18)_0%,transparent_70%)] -top-[10%] -left-[5%] animate-[orbFloat1_14s_ease-in-out_infinite]" />
      <div className="absolute w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,rgba(59,130,246,0.15)_0%,transparent_70%)] bottom-[0%] -right-[5%] animate-[orbFloat2_18s_ease-in-out_infinite]" />
      <div className="absolute w-[350px] h-[350px] rounded-full bg-[radial-gradient(circle,rgba(139,92,246,0.12)_0%,transparent_70%)] top-[40%] left-[55%] animate-[orbFloat3_22s_ease-in-out_infinite]" />
    </div>
  );
}

/* ─── Scroll Indicator ──────────────────────────────────────────────────── */
function ScrollIndicator() {
  return (
    <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-[fadeInUp_1s_2.5s_both]">
      <span className="text-[11px] tracking-[0.2em] text-white/30 uppercase">
        Scroll
      </span>
      <div className="w-[1px] h-12 bg-gradient-to-b from-blue-400/60 to-transparent animate-[scrollLine_2s_ease-in-out_infinite]" />
    </div>
  );
}

/* ─── Hero ──────────────────────────────────────────────────────────────── */
export default function Hero() {
  const heroContentRef = useRef(null);
  const scrollTargetY = useRef(0);
  const currentScrollY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      scrollTargetY.current = window.scrollY * 0.22;
    };

    let raf;
    const animate = () => {
      currentScrollY.current += (scrollTargetY.current - currentScrollY.current) * 0.08;

      if (heroContentRef.current) {
        heroContentRef.current.style.transform = `translate3d(0, ${currentScrollY.current}px, 0)`;
      }

      raf = requestAnimationFrame(animate);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    raf = requestAnimationFrame(animate);
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=DM+Sans:wght@300;400;500&display=swap');

        .glitch-text::before,
        .glitch-text::after {
          content: attr(data-text);
          position: absolute;
          inset: 0;
          clip-path: polygon(0 30%, 100% 30%, 100% 50%, 0 50%);
        }
        .glitch-text::before {
          color: #60a5fa;
          animation: glitch1 4s infinite;
          left: -2px;
        }
        .glitch-text::after {
          color: #a78bfa;
          animation: glitch2 4s infinite;
          left: 2px;
        }

        @keyframes glitch1 {
          0%,90%,100% { opacity: 0; transform: skewX(0); }
          92% { opacity: 0.8; transform: skewX(-4deg); clip-path: polygon(0 20%, 100% 20%, 100% 40%, 0 40%); }
          94% { opacity: 0.8; transform: skewX(3deg); clip-path: polygon(0 60%, 100% 60%, 100% 80%, 0 80%); }
          96% { opacity: 0; }
        }
        @keyframes glitch2 {
          0%,91%,100% { opacity: 0; transform: skewX(0); }
          93% { opacity: 0.7; transform: skewX(4deg); clip-path: polygon(0 50%, 100% 50%, 100% 70%, 0 70%); }
          95% { opacity: 0.7; transform: skewX(-2deg); clip-path: polygon(0 10%, 100% 10%, 100% 30%, 0 30%); }
          97% { opacity: 0; }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(28px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes orbFloat1 {
          0%,100% { transform: translate(0,0) scale(1); }
          50% { transform: translate(40px,30px) scale(1.08); }
        }
        @keyframes orbFloat2 {
          0%,100% { transform: translate(0,0) scale(1); }
          50% { transform: translate(-30px,-40px) scale(1.1); }
        }
        @keyframes orbFloat3 {
          0%,100% { transform: translate(0,0) scale(1); }
          50% { transform: translate(20px,-25px) scale(0.95); }
        }
        @keyframes scrollLine {
          0%,100% { opacity: 1; transform: scaleY(1); transform-origin: top; }
          50% { opacity: 0.3; transform: scaleY(0.5); }
        }
        @keyframes heroFloat {
          0%,100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-12px) rotate(-1deg); }
        }
        @keyframes heroPulse {
          0%,100% { opacity: 0.55; transform: scale(1); }
          50% { opacity: 0.92; transform: scale(1.06); }
        }
        @keyframes shineSweep {
          0% { transform: translateX(-120%) skewX(-18deg); opacity: 0; }
          20% { opacity: 0.8; }
          60% { transform: translateX(120%) skewX(-18deg); opacity: 0.7; }
          100% { transform: translateX(120%) skewX(-18deg); opacity: 0; }
        }
      `}</style>

      <div className="bg-[#04060f] text-slate-200 font-['DM_Sans',sans-serif] cursor-none overflow-x-hidden selection:bg-blue-500/30">
        
        <Cursor />

        <section
          id="hero"
          className="relative min-h-screen flex items-center justify-center overflow-hidden py-20 lg:py-0 scroll-mt-12"
        >
          <AmbientOrbs />
          <ParticleCanvas />
          
          <div 
            className="absolute inset-0 opacity-[0.025] pointer-events-none" 
            style={{ 
              backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
              backgroundSize: "180px"
            }} 
          />

          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,black,transparent)]" />

          {/* ── Asymmetric Layout Grid ── */}
          <div
            ref={heroContentRef}
            className="relative z-10 max-w-7xl w-[90%] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
            style={{ willChange: "transform" }}
          >
            
            {/* ── Left Column: Text & Content ── */}
            <div className="lg:col-span-7 text-left order-2 lg:order-1">
              
              {/* Heading Layout */}
              <h1 className="font-['Syne',sans-serif] text-[clamp(34px,5.2vw,64px)] font-extrabold leading-tight tracking-tight text-white mb-6 animate-[fadeInUp_0.8s_0.2s_both]">
                {/* Fixed White Glitch Name */}
                <div className="mb-2">
                  <GlitchText text="Hi, I'm Chaitanya" />
                </div>
                {/* Typewriter Profession Row */}
                <div className="text-[0.55em] text-white/55 font-light tracking-tight h-10 flex items-center font-['DM_Sans',sans-serif]">
                  I am&nbsp;<Typewriter />
                </div>
              </h1>

              {/* Bio Description */}
              <p className="max-w-[540px] mb-10 text-sm md:text-base leading-relaxed text-white/40 font-light animate-[fadeInUp_0.8s_0.4s_both]">
                Full-stack engineer. ML practitioner. I design systems that are as intelligent on the inside as they are seamless on the outside. I build systems, not just projects.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap gap-4 animate-[fadeInUp_0.8s_0.6s_both]">
                <a 
                  href="#projects" 
                  className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-lg font-['DM_Sans',sans-serif] text-[15px] font-medium transition-all duration-300 no-underline tracking-wide bg-gradient-to-br from-blue-500 to-indigo-500 text-white shadow-[0_0_24px_rgba(99,102,241,0.35)] hover:-translate-y-0.5 hover:scale-[1.03] hover:shadow-[0_0_40px_rgba(99,102,241,0.55)] cursor-none" 
                  data-hover
                >
                  View My Work
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
                <a 
                  href="#contact" 
                  className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-lg font-['DM_Sans',sans-serif] text-[15px] font-medium transition-all duration-300 no-underline tracking-wide bg-transparent text-white/75 border border-white/15 hover:border-blue-400/50 hover:text-white hover:bg-blue-400/10 hover:-translate-y-0.5 cursor-none" 
                  data-hover
                >
                  Let's Connect
                </a>
              </div>
            </div>

            {/* ── Right Column: Photo with Spinning Light Animation ── */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end order-1 lg:order-2 animate-[fadeInUp_0.8s_0.4s_both]">
              <div className="relative w-72 h-72 md:w-80 md:h-80 flex items-center justify-center">
                <div className="absolute inset-[-16px] rounded-full bg-blue-500/10 blur-3xl animate-[heroPulse_5.5s_ease-in-out_infinite]" />
                
                <div className="absolute inset-0 rounded-full border border-dashed border-blue-500/30 animate-[spin_28s_linear_infinite]" />
                
                <div className="absolute inset-2 rounded-full bg-gradient-to-tr from-blue-500/20 via-purple-500/40 to-transparent blur-md animate-[spin_12s_linear_infinite]" />

                <div className="absolute inset-5 rounded-full border border-white/8 animate-[spin_18s_linear_infinite_reverse]" />
                
                <div className="relative w-[92%] h-[92%] rounded-full p-[3px] bg-gradient-to-br from-blue-400 via-indigo-500 to-purple-500 shadow-[0_0_48px_rgba(59,130,246,0.28)] animate-[heroFloat_7.5s_ease-in-out_infinite]">
                  <div className="absolute inset-[6px] rounded-full overflow-hidden border border-white/10 bg-[#04060f]">
                    <img 
                      src="/port1.jpeg"
                      alt="Chaitanya Puranik" 
                      className="w-full h-full rounded-full object-cover scale-[1.03]"
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(96,165,250,0.16),transparent_38%,rgba(167,139,250,0.1))] mix-blend-screen" />
                    <div className="absolute inset-y-0 left-[-38%] w-1/2 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.14),transparent)] animate-[shineSweep_5.5s_ease-in-out_infinite]" />
                  </div>
                </div>
              </div>
            </div>

          </div>

          <ScrollIndicator />
        </section>
      </div>
    </>
  );
}