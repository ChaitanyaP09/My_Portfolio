import React from 'react';
import { motion } from 'framer-motion';
import {
  SiCplusplus,
  SiPython,
  SiReact,
  SiTailwindcss,
  SiJavascript,
  SiMysql,
  SiGithub,
  SiLinux,
} from 'react-icons/si';
import { FaBrain, FaPlug, FaJava } from 'react-icons/fa';
import { VscCode } from 'react-icons/vsc';  // ✅ VS Code icon from Codicons set

/* ── skill data with icons & brand colours ── */
const skills = [
  { category: "Core & Algorithms", items: [
    { name: "C/C++ (DSA)", icon: SiCplusplus,           color: "#00599C" },
    { name: "Java (OOP)",  icon: FaJava,                color: "#ED8B00" },
    { name: "Python",      icon: SiPython,              color: "#3776AB" },
  ]},
  { category: "Frontend Development", items: [
    { name: "React.js",     icon: SiReact,              color: "#61DAFB" },
    { name: "Tailwind CSS", icon: SiTailwindcss,        color: "#06B6D4" },
    { name: "JavaScript",   icon: SiJavascript,         color: "#F7DF1E" },
  ]},
  { category: "Other", items: [
    { name: "Machine Learning", icon: FaBrain,          color: "#FF6F61" },
    { name: "MySQL",            icon: SiMysql,          color: "#4479A1" },
    { name: "REST API",         icon: FaPlug,           color: "#68D391" },
  ]},
  { category: "Tools", items: [
    { name: "Git & GitHub", icon: SiGithub,             color: "#F05032" },
    { name: "VS Code",     icon: VscCode,               color: "#007ACC" },  // ✅ fixed
    { name: "Linux",       icon: SiLinux,               color: "#FCC624" },
  ]},
];

/* flatten for the marquee belt */
const allSkills = skills.flatMap(g => g.items);

/* ── framer variants ── */
const containerV = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
};
const cardV = {
  hidden: { y: 40, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } },
};

/* ── component ── */
const Skills = () => {
  return (
    <section id="skills" className="relative py-24 bg-gray-950 overflow-hidden">

      {/* ✦ ambient background glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[128px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[128px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── heading ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <h2 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
            Technical <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Skills</span>
          </h2>
          <p className="mt-4 max-w-2xl text-lg text-gray-400 mx-auto">
            My tech stack for building scalable applications.
          </p>
        </motion.div>

        {/* ═══════════════════════════════════════════
            ✦  INFINITE MARQUEE LOGO BELT  ✦
        ═══════════════════════════════════════════ */}
        <div className="relative mb-20 group">
          <div className="pointer-events-none absolute left-0 top-0 h-full w-24 z-10 bg-gradient-to-r from-gray-950 to-transparent" />
          <div className="pointer-events-none absolute right-0 top-0 h-full w-24 z-10 bg-gradient-to-l from-gray-950 to-transparent" />

          <div className="flex gap-12 overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)]">
            <motion.div
              className="flex gap-12 shrink-0"
              animate={{ x: ["0%", "-50%"] }}
              transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
              style={{ willChange: "transform" }}
            >
              {[...allSkills, ...allSkills].map((skill, i) => {
                const Icon = skill.icon;
                return (
                  <div key={i} className="flex flex-col items-center justify-center min-w-[100px] group/icon">
                    <div
                      className="p-4 rounded-2xl bg-gray-800/60 backdrop-blur-md border border-gray-700/50
                                 transition-all duration-300 hover:scale-110 hover:shadow-[0_0_30px_var(--glow)]"
                      style={{ "--glow": `${skill.color}66` }}
                    >
                      <Icon className="w-10 h-10 transition-colors duration-300" style={{ color: skill.color }} />
                    </div>
                    <span className="mt-2 text-xs text-gray-500 group-hover/icon:text-gray-300 transition-colors whitespace-nowrap">
                      {skill.name}
                    </span>
                  </div>
                );
              })}
            </motion.div>
          </div>
        </div>

        {/* ═══════════════════════════════════════════
            ✦  GLASSMORPHISM SKILL CARDS  ✦
        ═══════════════════════════════════════════ */}
        <motion.div
          variants={containerV}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {skills.map((group, i) => (
            <motion.div
              key={i}
              variants={cardV}
              whileHover={{ y: -8, scale: 1.03 }}
              className="relative rounded-2xl p-6 bg-white/5 backdrop-blur-lg border border-white/10
                         shadow-lg hover:shadow-2xl transition-all duration-300 group/card overflow-hidden"
            >
              <div
                className="absolute -top-10 -right-10 w-32 h-32 rounded-full blur-2xl opacity-0
                           group-hover/card:opacity-30 transition-opacity duration-500"
                style={{ backgroundColor: group.items[0].color }}
              />

              <h3 className="text-xl font-bold text-white mb-5 tracking-wide">
                {group.category}
              </h3>

              <ul className="space-y-3">
                {group.items.map((skill, idx) => {
                  const Icon = skill.icon;
                  return (
                    <motion.li
                      key={idx}
                      whileHover={{ x: 6 }}
                      className="flex items-center gap-3 text-gray-300 group/item cursor-default"
                    >
                      <span
                        className="p-1.5 rounded-lg bg-gray-800 border border-gray-700
                                   group-hover/item:border-transparent group-hover/item:shadow-[0_0_12px_var(--glow)]
                                   transition-all duration-300"
                        style={{ "--glow": `${skill.color}88` }}
                      >
                        <Icon className="w-4 h-4" style={{ color: skill.color }} />
                      </span>
                      <span className="group-hover/item:text-white transition-colors">
                        {skill.name}
                      </span>
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