import React, { useEffect, useRef, useState } from "react";

function useScrollReveal(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

function ExperienceBlock({ company, role, timeline, points, badges }) {
  return (
    <div className="exp-block">
      <div className="exp-left">
        <h3 className="exp-company">{company}</h3>
        <p className="exp-role">{role}</p>
        <p className="exp-timeline">{timeline}</p>
      </div>
      <div className="exp-right">
        <ul className="exp-points-list">
          {points.map((point, index) => (
            <li key={index} className="exp-point-item">
              <span className="exp-arrow">→</span>
              <p className="exp-text">{point}</p>
            </li>
          ))}
        </ul>
        {badges && (
          <div className="exp-badge-row">
            {badges.map((badge, idx) => (
              <span key={idx} className="exp-metric-badge">{badge}</span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function Experience() {
  const [sectionRef, visible] = useScrollReveal(0.1);

  return (
    <section id="experience" ref={sectionRef} className="editorial-section">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@300;400;500&display=swap');

        .editorial-section {
          position: relative;
          padding: clamp(100px, 10vw, 160px) 0;
          background: #04060f;
          overflow: hidden;
          font-family: 'DM Sans', sans-serif;
          color: #e2e8f0;
        }

        .exp-container {
          width: 90%;
          max-width: 80rem;
          margin: 0 auto;
        }

        .exp-heading {
          font-family: 'Syne', sans-serif;
          font-size: clamp(38px, 4.8vw, 62px);
          font-weight: 800;
          color: #fff;
          line-height: 1.1;
          letter-spacing: -0.03em;
          margin-bottom: 56px;
        }

        .exp-heading span {
          background: linear-gradient(135deg, #60a5fa, #a78bfa);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          position: relative;
          display: inline-block;
        }
        

        .exp-list {
          display: flex;
          flex-direction: column;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
        }

        .exp-block {
          display: grid;
          grid-template-columns: 1fr 2.2fr;
          gap: 48px;
          padding: 56px 0;
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
        }

        .exp-company {
          font-size: clamp(17px, 1.4vw, 21px);
          font-weight: 500;
          color: #fff;
          margin-bottom: 6px;
          letter-spacing: -0.01em;
        }

        .exp-role {
          font-size: clamp(14px, 1.1vw, 15px);
          color: rgba(167, 139, 250, 0.85);
          font-weight: 400;
          font-style: italic;
          margin-bottom: 12px;
        }

        .exp-timeline {
          font-size: 13px;
          color: rgba(255, 255, 255, 0.3);
          font-weight: 300;
        }

        .exp-points-list {
          display: flex;
          flex-direction: column;
          gap: 20px;
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .exp-point-item {
          display: flex;
          align-items: flex-start;
          gap: 16px;
        }

        .exp-arrow {
          color: rgba(96, 165, 250, 0.6);
          font-size: 15px;
          line-height: 1.6;
          user-select: none;
        }

        .exp-text {
          font-size: clamp(14px, 1.1vw, 15px);
          line-height: 1.65;
          color: rgba(255, 255, 255, 0.5);
          font-weight: 300;
          margin: 0;
        }

        .exp-badge-row {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          margin-top: 24px;
        }

        .exp-metric-badge {
          font-size: 11px;
          font-weight: 400;
          color: rgba(255, 255, 255, 0.5);
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.06);
          padding: 6px 14px;
          border-radius: 4px;
          letter-spacing: 0.02em;
        }

        @media (max-width: 992px) {
          .exp-block { grid-template-columns: 1fr; gap: 24px; padding: 40px 0; }
        }
      `}</style>

      <div className="exp-container">
        <div style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(24px)",
          transition: "opacity 1s cubic-bezier(0.16, 1, 0.3, 1), transform 1s cubic-bezier(0.16, 1, 0.3, 1)",
        }}>
          <h2 className="exp-heading">
            Where I've <span>Worked</span>
          </h2>
          <div className="exp-list">
            <ExperienceBlock
              company="Praj Industries"
              role="Software Engineering Intern"
              timeline="Feb 2026 — May 2026"
              points={[
                "Contributed to an AI-assisted engineering comment extraction platform optimized for parsing large-scale annotated PDF drawings.",
                "Engineered robust automation workflows involving low-level PDF document parsing, targeted metadata extraction, and production-grade JSON/CSV dataset generation.",
                "Developed secure frontend client panels and robust server modules for real-time review tracking, project management, and operational dashboards."
              ]}
              badges={["AI Comment Extraction Pipeline", "PostgreSQL Management", "JSON / CSV Automation Engine"]}
            />
            <ExperienceBlock
              company="Team Nemesis Racing"
              role="Powertrain Engineer"
              timeline="Aug 2023 — Mar 2024"
              points={[
                "Designed, programmed, and optimized firmware deployment patterns for low-voltage electric systems and automated controller components.",
                "Developed control system software loops on microcontroller platforms (Arduino framework) to balance electric powertrain current paths.",
                "Maintained strict cross-system integration protocols ensuring reliable, hardware-to-software execution under transient high-vibration racing conditions."
              ]}
              badges={["Embedded Firmware Engine", "LV Control Architectures", "Electric Powertrain Logic"]}
            />
          </div>
        </div>
      </div>
    </section>
  );
}