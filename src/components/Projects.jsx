import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

const projects = [
  {
    title: "Law Firm Website",
    description:
      "A modern, responsive law firm website designed to clearly present legal services, improve client reach, and ensure fast, reliable access across all devices.",
    tags: ["React", "Tailwind CSS", "JavaScript", "Responsive Design"],
    github: "https://github.com/ChaitanyaP09/Verdict_.git",
    live: null,
    icon: "⚖️",
    color: "#3B82F6",
  },
  {
    title: "Text Editor Using C",
    description:
      "A GUI-based text editor built in C using GTK, featuring custom data structures for text handling, efficient cursor navigation, and real-time editing.",
    tags: ["C", "GTK", "Tries", "Data Structures"],
    github: "https://github.com/SurajSonawane174/Text_editor.git",
    live: null,
    icon: "📝",
    color: "#8B5CF6",
  },
  {
    title: "Movie Recommendation System",
    description:
      "A movie recommendation system built using machine learning and data science techniques, integrated into a web app for personalised suggestions in real time.",
    tags: ["Machine Learning", "Python", "Data Science"],
    github: "#",
    live: null,
    icon: "🎬",
    color: "#EC4899",
  },
];

/* ── variants ── */
const containerV = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
};
const cardV = {
  hidden: { y: 50, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 80, damping: 14 } },
};

const Projects = () => {
  const [hoveredIdx, setHoveredIdx] = useState(null);

  return (
    <section id="projects" className="relative py-24 bg-gray-950 overflow-hidden">
      {/* ambient blobs */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-0 left-1/3 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[140px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
            Featured{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
              Projects
            </span>
          </h2>
          <p className="mt-4 max-w-2xl text-lg text-gray-400 mx-auto">
            Selected work focused on clarity, performance, and execution.
          </p>
        </motion.div>

        {/* cards grid */}
        <motion.div
          variants={containerV}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {projects.map((project, index) => (
            <motion.div
              key={index}
              variants={cardV}
              onMouseEnter={() => setHoveredIdx(index)}
              onMouseLeave={() => setHoveredIdx(null)}
              whileHover={{ y: -12 }}
              className="group relative rounded-2xl bg-white/[0.03] backdrop-blur-md
                         border border-white/10 overflow-hidden flex flex-col h-full
                         hover:border-white/20 transition-all duration-500"
            >
              {/* top accent glow */}
              <div
                className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: `linear-gradient(90deg, transparent, ${project.color}, transparent)`,
                }}
              />

              {/* corner glow blob */}
              <AnimatePresence>
                {hoveredIdx === index && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.15 }}
                    exit={{ opacity: 0 }}
                    className="absolute -top-16 -right-16 w-48 h-48 rounded-full blur-3xl"
                    style={{ backgroundColor: project.color }}
                  />
                )}
              </AnimatePresence>

              <div className="relative p-8 flex-grow">
                {/* icon + title row */}
                <div className="flex items-center gap-3 mb-4">
                  <span
                    className="flex items-center justify-center w-12 h-12 rounded-xl text-2xl
                               bg-white/5 border border-white/10 group-hover:scale-110
                               group-hover:shadow-[0_0_20px_var(--glow)] transition-all duration-300"
                    style={{ "--glow": `${project.color}66` }}
                  >
                    {project.icon}
                  </span>
                  <h3 className="text-xl font-bold text-white group-hover:text-transparent
                                 group-hover:bg-clip-text group-hover:bg-gradient-to-r
                                 group-hover:from-white group-hover:to-gray-300 transition-all">
                    {project.title}
                  </h3>
                </div>

                <p className="text-gray-400 leading-relaxed mb-6 text-sm">
                  {project.description}
                </p>

                {/* tags */}
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, tagIdx) => (
                    <span
                      key={tagIdx}
                      className="px-3 py-1 rounded-lg text-xs font-medium
                                 bg-white/5 text-gray-300 border border-white/10
                                 group-hover:border-white/20 transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* footer links */}
              <div className="px-8 py-4 border-t border-white/5 bg-white/[0.02] flex items-center gap-4">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-gray-400 font-medium
                             hover:text-white transition-colors group/link"
                >
                  <FaGithub className="w-4 h-4" />
                  <span>Source Code</span>
                  <motion.span
                    className="inline-block"
                    whileHover={{ x: 3 }}
                  >
                    →
                  </motion.span>
                </a>

                {project.live && (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm font-medium transition-colors"
                    style={{ color: project.color }}
                  >
                    <FaExternalLinkAlt className="w-3 h-3" />
                    <span>Live Demo</span>
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;