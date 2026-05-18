import { useEffect, useRef, useState } from "react";

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

function MetricItem({ value, label, subtext }) {
  return (
    <div className="metric-container">
      <div className="metric-value">{value}</div>
      <div className="metric-label">
        {label} {subtext && <span className="metric-subtext">— {subtext}</span>}
      </div>
    </div>
  );
}

export default function About() {
  const [sectionRef, visible] = useScrollReveal(0.1);

  return (
    <section id="about" ref={sectionRef} className="editorial-section">
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

        .about-container {
          width: 90%;
          max-width: 80rem;
          margin: 0 auto;
        }

        .about-heading {
          font-family: 'Syne', sans-serif;
          font-size: clamp(38px, 4.8vw, 62px);
          font-weight: 800;
          color: #fff;
          line-height: 1.08;
          letter-spacing: -0.03em;
          margin-bottom: 56px;
        }

        .about-heading span {
          background: linear-gradient(135deg, #60a5fa, #a78bfa);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .about-grid {
          display: grid;
          grid-template-columns: 1.2fr 1fr;
          gap: clamp(40px, 6vw, 100px);
          align-items: start;
        }

        .about-para {
          font-size: clamp(15px, 1.1vw, 16px);
          line-height: 1.9;
          color: rgba(255,255,255,0.45);
          font-weight: 300;
          margin-bottom: 28px;
        }

        .metrics-column {
          display: flex;
          flex-direction: column;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
        }

        .metric-container {
          padding: 32px 0;
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
        }

        .metric-value {
          font-family: 'Syne', sans-serif;
          font-size: clamp(32px, 3.6vw, 46px);
          font-weight: 800;
          line-height: 1;
          margin-bottom: 10px;
          color: #fff;
        }

        .metric-label {
          font-size: 13px;
          color: rgba(255, 255, 255, 0.4);
          letter-spacing: 0.02em;
          line-height: 1.5;
        }

        .metric-subtext {
          color: rgba(96, 165, 250, 0.5);
          font-weight: 300;
        }

        .about-cta-container {
          margin-top: 40px;
        }

        .resume-btn {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 12px 30px;
          border-radius: 8px;
          background: transparent;
          border: 1px solid rgba(96,165,250,0.3);
          color: #60a5fa;
          font-size: 14px;
          font-weight: 500;
          text-decoration: none;
          letter-spacing: 0.04em;
          transition: all 0.3s ease;
        }

        .resume-btn:hover {
          background: rgba(96,165,250,0.06);
          border-color: #60a5fa;
        }

        @media (max-width: 992px) {
          .about-grid { grid-template-columns: 1fr; gap: 56px; }
        }
      `}</style>

      <div className="about-container">
        <div style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(24px)",
          transition: "opacity 1s cubic-bezier(0.16, 1, 0.3, 1), transform 1s cubic-bezier(0.16, 1, 0.3, 1)",
        }}>
          <h2 className="about-heading">
            About<span>Me</span>
          </h2>

          <div className="about-grid">
            <div className="content-column">
              <p className="about-para">
                I am a Computer Engineering undergraduate at COEP Technological University, deeply invested in building scalable software systems and advancing my expertise in intelligent computing. My journey as a developer is driven by a profound curiosity about how complex architecture behaves under heavy loads, and how predictive modeling can make standard applications feel entirely personalized.
              </p>
              <p className="about-para">
                When crafting user interfaces, I lean towards creating interactive, fluid web experiences using modern ecosystems like React and Tailwind CSS. On the flip side, my time spent handling machine learning frameworks involves translating complex data pipelines into operational structures, working with everything from algorithmic fine-tuning to deep reinforcement learning setups.
              </p>
              <p className="about-para">
                Ultimately, I see engineering as a collaborative craft where structured, elegant code directly unlocks creative freedom. Whether optimizing a routing pipeline, experimenting with model optimization, or perfecting a user flow, my goal is always to deliver robust software solutions that solve meaningful, real-world constraints.
              </p>
              <div className="about-cta-container">
                <a href="/Chaitanya_Resume.pdf" target="_blank" rel="noreferrer" className="resume-btn">
                  Download Resume
                </a>
              </div>
            </div>

            <div className="metrics-column">
              <MetricItem value="Full-Stack" label="End-to-end web architecture blending fluid client interfaces with robust data layers" />
              <MetricItem value="300+" label="Algorithmic problems solved across LeetCode and Codeforces" subtext="Arrays, Graphs, DP" />
              <MetricItem value="Systems" label="Low-level software development, custom data structures, and terminal-based ncurses engineering in C" />
              <MetricItem value="Machine Learning" label="Engineering predictive models, processing data pipelines, and implementing core ML algorithms" subtext="Scikit-learn & Python" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}