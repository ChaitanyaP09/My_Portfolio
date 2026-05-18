import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaTimes } from 'react-icons/fa';

const NavMob = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const scrollToSection = (href) => {
    const target = document.querySelector(href);
    if (!target) return;

    const navOffset = 84;
    const top = target.getBoundingClientRect().top + window.scrollY - navOffset;
    window.scrollTo({ top, behavior: "smooth" });
  };

  // Snappy, professional spring kinematics matching your project cards
  const menuVariants = {
    closed: { 
      x: "100%", 
      opacity: 0,
      transition: { type: "spring", stiffness: 120, damping: 20 }
    },
    open: { 
      x: 0, 
      opacity: 1, 
      transition: { type: "spring", stiffness: 100, damping: 16 } 
    }
  };

  // Complete, synchronized section index routing
  const navLinks = [
    { title: "Home", href: "#hero" },
    { title: "About", href: "#about" },
    { title: "Experience", href: "#experience" },
    { title: "Education", href: "#education" },
    { title: "Work", href: "#projects" },
    { title: "Skills", href: "#skills" },
    { title: "Contact", href: "#contact" },
  ];

  return (
    <nav className="md:hidden fixed top-0 w-full z-50 bg-[#04060f]/80 backdrop-blur-xl border-b border-white/[0.06] font-['DM_Sans',sans-serif]">
      <div className="px-6 py-4 flex justify-between items-center">
        
        {/* Mobile Logo Matching Your Editorial Brand Identity */}
        <h1 className="font-['Syne',sans-serif] text-xl font-extrabold tracking-tight text-white">
          Chaitanya<span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent font-medium">.</span>
        </h1>

        {/* Hamburger Trigger */}
        <button 
          onClick={toggleMenu} 
          className="text-white/70 hover:text-white transition-colors focus:outline-none p-1"
          aria-label="Toggle navigation menu"
        >
          {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
        </button>
      </div>

      {/* Full Screen Overlay System */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            className="fixed inset-0 top-[61px] bg-[#04060f]/98 backdrop-blur-2xl z-40 flex flex-col items-start px-12 justify-start pt-16"
          >
            {/* Background ambient point glow */}
            <div className="pointer-events-none absolute bottom-0 right-0 w-80 h-80 bg-blue-500/5 rounded-full blur-[90px]" />

            <div className="flex flex-col space-y-7 text-left w-full relative z-10">
              {navLinks.map((link, idx) => (
                <motion.a
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.04, ease: "easeOut" }}
                  key={link.title}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    toggleMenu();
                    scrollToSection(link.href);
                  }}
                  className="text-2xl font-['Syne',sans-serif] font-bold text-white/50 hover:text-white transition-colors tracking-tight flex items-center gap-4 group"
                >
                  <span className="text-xs font-['DM_Sans',sans-serif] font-light text-blue-400/40 group-hover:text-blue-400 transition-colors">
                    0{idx + 1}
                  </span>
                  {link.title}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default NavMob;