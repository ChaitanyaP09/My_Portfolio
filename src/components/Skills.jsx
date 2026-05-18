import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SiCplusplus, SiPython, SiReact, SiTailwindcss, SiJavascript, SiPostgresql, SiSupabase, SiScikitlearn, SiPytorch, SiNumpy, SiPandas, SiGithub, SiLinux, SiMysql, SiNextdotjs } from 'react-icons/si';
import { FaJava, FaNetworkWired } from 'react-icons/fa';
import { HiOutlineDocumentSearch } from 'react-icons/hi';

const skills = [
  { category: "Languages & Systems", items: [
    { name: "C/C++ (DSA)", icon: SiCplusplus, color: "#00599C" },
    { name: "Java (OOP)", icon: FaJava, color: "#ED8B00" },
    { name: "Python", icon: SiPython, color: "#3776AB" },
    { name: "Linux Systems", icon: SiLinux, color: "#FCC624" },
  ]},
  { category: "Frontend Dev", items: [
    { name: "React.js", icon: SiReact, color: "#61DAFB" },
    { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4" },
    { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
    { name: "Next.js", icon: SiNextdotjs, color: "#06B6D4" },
  ]},
  { category: "Backend & Data", items: [
    { name: "PostgreSQL", icon: SiPostgresql, color: "#4169E1" },
    { name: "Supabase", icon: SiSupabase, color: "#3ECF8E" },
    { name: "Git & GitHub", icon: SiGithub, color: "#F05032" },
    { name: "MySQL", icon: SiMysql, color: "#E05834" },
  ]},
  { category: "Machine Learning", items: [
    { name: "PyTorch", icon: SiPytorch, color: "#EE4C2C" },
    { name: "Scikit-learn", icon: SiScikitlearn, color: "#F7931E" },
    { name: "Pandas & NumPy", icon: SiPandas, color: "#150458" },
    { name: "Neural Nets (CNN/ANN)", icon: FaNetworkWired, color: "#A78BFA" },
    { name: "Tesseract OCR", icon: HiOutlineDocumentSearch, color: "#60A5FA" },
  ]},
];

const allSkills = skills.flatMap(g => g.items);

const containerV = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};
const cardV = {
  hidden: { y: 30, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 90, damping: 14 } },
};

const Skills = () => {
  const [hoveredCardIdx, setHoveredCardIdx] = useState(null);

  return (
    <section id="skills" className="relative py-32 bg-[#04060f] overflow-hidden scroll-mt-12">
      <style>{`
        .skills-container {
          width: 90%;
          max-width: 80rem;
          margin: 0 auto;
        }
        .skills-heading {
          font-family: 'Syne', sans-serif;
          font-size: clamp(38px, 4.8vw, 62px);
          font-weight: 800;
          color: #fff;
          line-height: 1.1;
          letter-spacing: -0.03em;
          margin-bottom: 72px;
          text-align: left;
        }
        .skills-heading span {
          background: linear-gradient(135deg, #60a5fa, #a78bfa);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
      `}</style>

      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[128px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[128px]" />
      </div>

      <div className="skills-container">
        <h2 className="skills-heading">
          Technical <span>Stack</span>
        </h2>

        <div className="relative mb-24 group" data-hover>
          <div className="pointer-events-none absolute left-0 top-0 h-full w-24 z-10 bg-gradient-to-r from-[#04060f] to-transparent" />
          <div className="pointer-events-none absolute right-0 top-0 h-full w-24 z-10 bg-gradient-to-l from-[#04060f] to-transparent" />
          <div className="flex gap-12 overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)]">
            <motion.div
              className="flex gap-12 shrink-0"
              animate={{ x: ["0%", "-50%"] }}
              transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
              style={{ willChange: "transform" }}
            >
              {[...allSkills, ...allSkills].map((skill, i) => {
                const Icon = skill.icon;
                return (
                  <div key={i} className="flex flex-col items-center justify-center min-w-[110px] group/icon">
                    <div
                      className="p-4 rounded-2xl bg-white/[0.02] backdrop-blur-md border border-white/10 transition-all duration-300 group-hover/icon:scale-110 group-hover/icon:shadow-[0_0_30px_var(--glow)] group-hover/icon:border-white/20"
                      style={{ "--glow": `${skill.color}44` }}
                    >
                      <Icon className="w-9 h-9 transition-colors duration-300" style={{ color: skill.color }} />
                    </div>
                    <span className="mt-2 text-xs text-white/30 group-hover/icon:text-white/70 transition-colors whitespace-nowrap font-light tracking-wide">
                      {skill.name}
                    </span>
                  </div>
                );
              })}
            </motion.div>
          </div>
        </div>

        <motion.div
          variants={containerV}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {skills.map((group, i) => (
            <motion.div
              key={i}
              variants={cardV}
              onMouseEnter={() => setHoveredCardIdx(i)}
              onMouseLeave={() => setHoveredCardIdx(null)}
              whileHover={{ y: -6, scale: 1.01 }}
              className="relative rounded-2xl p-6 bg-white/[0.02] backdrop-blur-md border border-white/10 shadow-lg hover:border-white/20 transition-all duration-300 group/card overflow-hidden"
              data-hover
            >
              <AnimatePresence>
                {hoveredCardIdx === i && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.15 }}
                    exit={{ opacity: 0 }}
                    className="absolute -top-10 -right-10 w-32 h-32 rounded-full blur-2xl pointer-events-none"
                    style={{ backgroundColor: group.items[0].color }}
                  />
                )}
              </AnimatePresence>
              <h3 className="font-['Syne',sans-serif] text-base font-bold text-white mb-5 tracking-wide border-b border-white/5 pb-2">
                {group.category}
              </h3>
              <ul className="space-y-3.5">
                {group.items.map((skill, idx) => {
                  const Icon = skill.icon;
                  return (
                    <motion.li
                      key={idx}
                      whileHover={{ x: 4 }}
                      className="flex items-center gap-3 text-white/50 group/item cursor-default text-sm font-light"
                    >
                      <span
                        className="p-1.5 rounded-lg bg-white/5 border border-white/10 group-hover/item:border-transparent group-hover/item:shadow-[0_0_12px_var(--glow)] transition-all duration-300"
                        style={{ "--glow": `${skill.color}66` }}
                      >
                        <Icon className="w-4 h-4" style={{ color: skill.color }} />
                      </span>
                      <span className="group-hover/item:text-white transition-colors">{skill.name}</span>
                    </motion.li>
                  );
                })}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;