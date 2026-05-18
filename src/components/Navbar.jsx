import { useEffect, useState } from "react";

const links = [
  // { label: "Hero", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Work", href: '#experience'},
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  const sections = links.map((l) => l.href.replace("#", ""));

  const scrollToSection = (href) => {
    const target = document.querySelector(href);
    if (!target) return;

    const navOffset = window.innerWidth < 768 ? 80 : 92;
    const top = target.getBoundingClientRect().top + window.scrollY - navOffset;
    window.scrollTo({ top, behavior: "smooth" });
  };

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);

      const scrollBottom = window.scrollY + window.innerHeight;
      const pageBottom = document.documentElement.scrollHeight - 96;

      if (scrollBottom >= pageBottom) {
        setActive("contact");
        return;
      }

      const probeLine = window.scrollY + window.innerHeight * 0.45;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (!el) continue;

        const top = el.offsetTop;
        const bottom = top + el.offsetHeight;

        if (probeLine >= top && probeLine < bottom) {
          setActive(sections[i]);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleClick = (e, href) => {
    e.preventDefault();
    setMenuOpen(false);
    scrollToSection(href);
  };

  return (
    <>
      <style>{`
        .nav-link {
          position: relative;
          font-size: 13px;
          font-weight: 500;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.45);
          text-decoration: none;
          padding: 6px 0;
          transition: color 0.3s;
          cursor: none;
        }
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 1px;
          background: linear-gradient(90deg, #60a5fa, #a78bfa);
          transition: width 0.35s cubic-bezier(.23,1,.32,1);
        }
        .nav-link:hover,
        .nav-link.active {
          color: rgba(255,255,255,0.95);
        }
        .nav-link:hover::after,
        .nav-link.active::after {
          width: 100%;
        }
        .hamburger span {
          display: block;
          width: 22px;
          height: 1.5px;
          background: rgba(255,255,255,0.6);
          transition: all 0.3s;
          transform-origin: center;
        }
        .hamburger.open span:nth-child(1) { transform: translateY(5.5px) rotate(45deg); }
        .hamburger.open span:nth-child(2) { opacity: 0; }
        .hamburger.open span:nth-child(3) { transform: translateY(-5.5px) rotate(-45deg); }

        .mobile-menu {
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(4,6,15,0.97);
          backdrop-filter: blur(20px);
          z-index: 9990;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 36px;
          transform: translateY(-100%);
          transition: transform 0.5s cubic-bezier(.23,1,.32,1);
        }
        .mobile-menu.open {
          transform: translateY(0);
        }
        .mobile-nav-link {
          font-family: 'Syne', sans-serif;
          font-size: 36px;
          font-weight: 700;
          color: rgba(255,255,255,0.3);
          text-decoration: none;
          letter-spacing: -0.02em;
          transition: color 0.3s;
          cursor: none;
        }
        .mobile-nav-link:hover {
          color: #60a5fa;
        }
      `}</style>

      {/* Desktop / Mobile Navbar */}
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 9995,
          padding: scrolled ? "14px 48px" : "22px 48px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: scrolled
            ? "rgba(4,6,15,0.85)"
            : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: scrolled
            ? "1px solid rgba(255,255,255,0.06)"
            : "1px solid transparent",
          transition: "all 0.4s cubic-bezier(.23,1,.32,1)",
        }}
      >
        {/* Logo */}
        <a
          href="#"
          onClick={(e) => handleClick(e, "#hero")}
          data-hover
          style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: 20,
            fontWeight: 800,
            color: "#fff",
            textDecoration: "none",
            letterSpacing: "-0.02em",
            cursor: "none",
          }}
        >
          Chaitanya Puranik
          <span
            style={{
              display: "inline-block",
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: "#60a5fa",
              marginLeft: 3,
              verticalAlign: "middle",
              boxShadow: "0 0 8px rgba(96,165,250,0.8)",
            }}
          />
        </a>

        {/* Desktop Links */}
        <div
          style={{
            display: "flex",
            gap: 36,
            alignItems: "center",
          }}
          className="desktop-nav"
        >
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={(e) => handleClick(e, l.href)}
              data-hover
              className={`nav-link ${active === l.href.replace("#", "") ? "active" : ""}`}
            >
              {l.label}
            </a>
          ))}

          <a
            href="/Chaitanya_Resume.pdf"
            target="_blank"
            rel="noreferrer"
            data-hover
            style={{
              padding: "8px 20px",
              borderRadius: 6,
              border: "1px solid rgba(96,165,250,0.35)",
              color: "#60a5fa",
              fontSize: 12,
              fontWeight: 500,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              textDecoration: "none",
              transition: "all 0.3s",
              cursor: "none",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(96,165,250,0.1)";
              e.currentTarget.style.boxShadow = "0 0 18px rgba(96,165,250,0.2)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            Resume
          </a>
        </div>

        {/* Hamburger */}
        <button
          onClick={() => setMenuOpen((o) => !o)}
          className={`hamburger ${menuOpen ? "open" : ""}`}
          style={{
            display: "none",
            flexDirection: "column",
            gap: 4,
            background: "none",
            border: "none",
            padding: 4,
            cursor: "none",
            zIndex: 9999,
            position: "relative",
          }}
          aria-label="Toggle menu"
        >
          <span />
          <span />
          <span />
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        {links.map((l) => (
          <a
            key={l.href}
            href={l.href}
            onClick={(e) => handleClick(e, l.href)}
            className="mobile-nav-link"
            data-hover
          >
            {l.label}
          </a>
        ))}
      </div>

      {/* Responsive: hide desktop nav, show hamburger on mobile */}
      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .hamburger { display: flex !important; }
          nav { padding-left: 24px !important; padding-right: 24px !important; }
        }
      `}</style>
    </>
  );
}