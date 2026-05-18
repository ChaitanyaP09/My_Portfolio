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

function EducationRow({ institute, degree, timeline, grade }) {
  return (
    <div className="edu-row">
      <div className="edu-left">
        <h3 className="edu-institute">{institute}</h3>
        <p className="edu-degree">{degree}</p>
      </div>
      <div className="edu-right">
        <span className="edu-timeline">{timeline}</span>
        <span className="edu-grade">{grade}</span>
      </div>
    </div>
  );
}

export default function Education() {
  const [sectionRef, visible] = useScrollReveal(0.1);

  return (
    <section id="education" ref={sectionRef} className="editorial-section">
      <style>{`
        .editorial-section {
          position: relative;
          padding: clamp(100px, 10vw, 160px) 0;
          background: #04060f;
          overflow: hidden;
          font-family: 'DM Sans', sans-serif;
          color: #e2e8f0;
        }

        .edu-container {
          width: 90%;
          max-width: 80rem;
          margin: 0 auto;
        }

        .edu-heading {
          font-family: 'Syne', sans-serif;
          font-size: clamp(38px, 4.8vw, 62px);
          font-weight: 800;
          color: #fff;
          line-height: 1.1;
          letter-spacing: -0.03em;
          margin-bottom: 56px;
        }

        .edu-heading span {
          background: linear-gradient(135deg, #60a5fa, #a78bfa);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .edu-list {
          display: flex;
          flex-direction: column;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
        }

        .edu-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 40px 0;
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
          gap: 40px;
        }

        .edu-left {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .edu-institute {
          font-size: clamp(17px, 1.4vw, 21px);
          font-weight: 500;
          color: #fff;
          letter-spacing: -0.01em;
        }

        .edu-degree {
          font-size: clamp(13px, 1vw, 15px);
          color: rgba(255, 255, 255, 0.4);
          font-weight: 300;
        }

        .edu-right {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 8px;
          text-align: right;
        }

        .edu-timeline {
          font-size: 13px;
          color: rgba(255, 255, 255, 0.3);
          font-style: italic;
          font-family: 'Syne', sans-serif;
        }

        .edu-grade {
          font-family: 'Syne', sans-serif;
          font-size: clamp(16px, 1.3vw, 20px);
          font-weight: 700;
          color: #fff;
        }

        @media (max-width: 768px) {
          .edu-row { flex-direction: column; align-items: flex-start; gap: 16px; }
          .edu-right { align-items: flex-start; text-align: left; }
        }
      `}</style>

      <div className="edu-container">
        <div style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(24px)",
          transition: "opacity 1s cubic-bezier(0.16, 1, 0.3, 1), transform 1s cubic-bezier(0.16, 1, 0.3, 1)",
        }}>
          <h2 className="edu-heading">
            Academic <span>Background</span>
          </h2>
          <div className="edu-list">
            <EducationRow institute="COEP Technological University, Pune" degree="B.Tech — Computer Engineering" timeline="2023 — 2027" grade="CGPA 7.77 / 10.0" />
            <EducationRow institute="Class 12th — HSC Board" degree="Higher Secondary Education" timeline="2023" grade="83.83%" />
            <EducationRow institute="Class 10th — SSC Board" degree="Secondary Education" timeline="2021" grade="98.60%" />
          </div>
        </div>
      </div>
    </section>
  );
}