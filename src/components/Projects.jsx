import React from 'react';
import { motion } from 'framer-motion';

const projects = [
  {
    title: "Law Firm Platform",
    year: "2024",
    category: "Client-Focused Web Platform",
    description: "A high-performance digital application designed for legal consultancy. Engineered with responsive design mechanics to streamline client engagement, optimize content discovery, and maximize cross-device speed efficiency.",
    tags: ["React", "Tailwind CSS", "JavaScript", "Responsive Design"],
    color: "#3B82F6",
  },
  {
    title: "Custom Text Editor",
    year: "2024",
    category: "Systems Programming Project",
    description: "A low-level GUI text editor built in C leveraging the GTK framework. Integrated advanced memory-efficient data structures including Tries for prefix-based text operations, real-time cursor tracking, and buffered file input/output.",
    tags: ["C", "GTK", "Tries", "Systems Programming"],
    color: "#8B5CF6",
  },
  {
    title: "Comment Extraction Platform",
    year: "2026",
    category: "AI-Assisted Workflow System",
    description: "Engineered an automation system for extracting, classifying, and managing engineering notes from annotated PDF drawings. Built a parsing pipeline using Python, PyMuPDF, and Gemini for structured JSON outputs, backed by a secure React dashboard and PostgreSQL management.",
    tags: ["React", "Python", "PostgreSQL", "Gemini API", "PyMuPDF"],
    color: "#10B981",
  },
];

const containerV = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};
const cardV = {
  hidden: { y: 30, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 80, damping: 14 } },
};

export default function Projects() {
  return (
    <section id="projects" className="relative py-32 bg-[#04060f] overflow-hidden scroll-mt-24">
      <style>{`
        .projects-container {
          width: 90%;
          max-width: 80rem;
          margin: 0 auto;
        }
        .proj-heading {
          font-family: 'Syne', sans-serif;
          font-size: clamp(38px, 4.8vw, 62px);
          font-weight: 800;
          color: #fff;
          line-height: 1.1;
          letter-spacing: -0.03em;
          margin-bottom: 56px;
        }
        .proj-heading span {
          background: linear-gradient(135deg, #60a5fa, #a78bfa);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
      `}</style>

      <div className="projects-container">
        <h2 className="proj-heading">
          Featured <span>Work</span>
        </h2>

        <motion.div
          variants={containerV}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.05 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {projects.map((project, index) => (
            <motion.div
              key={index}
              variants={cardV}
              whileHover={{ y: -8 }}
              className="group relative flex h-full flex-col overflow-hidden rounded-[24px] border border-white/10 bg-white/[0.03] backdrop-blur-xl transition-all duration-500 hover:border-white/20"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(96,165,250,0.1),transparent_40%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <div className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                   style={{ background: `linear-gradient(90deg, transparent, ${project.color}, transparent)` }} />
              <div className="relative p-8 flex-grow flex flex-col justify-between">
                <div>
                  <div className="mb-6 flex items-center justify-between text-[11px] uppercase tracking-[0.22em] text-white/35 font-medium">
                    <span>0{index + 1}</span>
                    <span className="text-white/45 bg-white/5 border border-white/10 px-2.5 py-0.5 rounded-md">{project.year}</span>
                  </div>
                  <h3 className="font-['DM_Sans',sans-serif] text-xl font-bold text-white mb-4 tracking-tight">
                    {project.title}
                  </h3>
                  <p className="text-white/55 font-light leading-relaxed mb-6 text-sm">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-8">
                    {project.tags.map((tag, tagIdx) => (
                      <span key={tagIdx} className="px-2.5 py-1 rounded-full text-xs font-light bg-white/5 text-white/70 border border-white/10">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="pt-4 border-t border-white/5 text-[11px] uppercase tracking-[0.18em] text-white/30 font-medium">
                  <span>{project.category}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}