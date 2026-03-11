import React from "react";
import { motion } from "framer-motion";
import { FaLinkedin, FaGithub, FaHeart } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";

const socials = [
  {
    icon: FaLinkedin,
    href: "https://www.linkedin.com/in/chaitanya-puranik-27994b356/",
    label: "LinkedIn",
    color: "#0077B5",
  },
  {
    icon: FaGithub,
    href: "https://github.com/ChaitanyaP09",
    label: "GitHub",
    color: "#E6EDF3",
  },
  {
    icon: HiOutlineMail,
    href: "mailto:chaitanyapuranik9@gmail.com",
    label: "Email",
    color: "#EA4335",
  },
];

const navLinks = ["Home", "Skills", "Projects", "Contact"];

const Footer = () => {
  return (
    <footer id="contact" className="relative bg-gray-950 overflow-hidden">
      {/* ambient glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-blue-600/10 rounded-full blur-[120px]" />
      </div>

      {/* top divider line */}
      <div className="h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-10">
        {/* ── CTA block ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
            Let's{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
              Connect
            </span>
          </h2>
          <p className="mt-4 max-w-lg text-gray-400 text-lg mx-auto">
            Got a project in mind, a question, or just want to say hi? I'm always open to
            new conversations and opportunities.
          </p>

          {/* email CTA button */}
          <motion.a
            whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(59,130,246,0.4)" }}
            whileTap={{ scale: 0.95 }}
            href="mailto:chaitanyapuranik9@gmail.com"
            className="inline-flex items-center gap-2 mt-8 px-8 py-3.5 rounded-xl
                       bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold
                       shadow-lg shadow-blue-500/25 transition-all relative overflow-hidden group"
          >
            {/* shimmer */}
            <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            <HiOutlineMail className="w-5 h-5" />
            <span className="relative">Say Hello</span>
          </motion.a>
        </motion.div>

        {/* ── social icons ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          viewport={{ once: true }}
          className="flex justify-center gap-5 mb-12"
        >
          {socials.map(({ icon: Icon, href, label, color }) => (
            <motion.a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -4, scale: 1.15 }}
              className="p-3.5 rounded-xl bg-white/5 border border-white/10
                         text-gray-400 hover:text-white transition-all duration-300
                         hover:border-transparent hover:shadow-[0_0_25px_var(--glow)]"
              style={{ "--glow": `${color}55` }}
              aria-label={label}
            >
              <Icon className="w-5 h-5" />
            </motion.a>
          ))}
        </motion.div>

        {/* ── divider ── */}
        <div className="h-px bg-gradient-to-r from-transparent via-gray-800 to-transparent mb-8" />

        {/* ── bottom row ── */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-500">
          {/* nav links */}
          <nav className="flex gap-6">
            {navLinks.map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="hover:text-white transition-colors duration-200"
              >
                {link}
              </a>
            ))}
          </nav>

          {/* copyright */}
          <p className="flex items-center gap-1.5">
            © {new Date().getFullYear()} Chaitanya Puranik · Made with
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            >
              <FaHeart className="w-3.5 h-3.5 text-red-500" />
            </motion.span>
            using React & Tailwind
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;