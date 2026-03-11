import React from 'react';
import { motion } from 'framer-motion';
import { Typewriter } from 'react-simple-typewriter';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { HiOutlineMail } from 'react-icons/hi';
import image from '../assets/port1.jpeg';

/* ── floating particle dots ── */
const particles = Array.from({ length: 30 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 4 + 1,
  duration: Math.random() * 15 + 10,
  delay: Math.random() * 5,
}));

const Hero = () => {
  return (
    <section
      id="home"
      className="relative pt-32 pb-20 min-h-screen flex items-center overflow-hidden
                 bg-[radial-gradient(ellipse_at_top_left,#1e3a5f_0%,#0f172a_50%,#000_100%)]"
    >
      {/* ✦ animated background grid */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* ✦ floating particles */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="pointer-events-none absolute rounded-full bg-blue-400/20"
          style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size }}
          animate={{ y: [0, -40, 0], opacity: [0.2, 0.6, 0.2] }}
          transition={{ repeat: Infinity, duration: p.duration, delay: p.delay, ease: 'easeInOut' }}
        />
      ))}

      {/* ✦ ambient glow blobs */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/4 -left-20 w-[500px] h-[500px] bg-blue-600/15 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-0 w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-[100px]" />
      </div>

      {/* ── main content ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col-reverse md:flex-row items-center justify-between w-full gap-12">

        {/* ═══════════ TEXT SIDE ═══════════ */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="md:w-1/2 mt-10 md:mt-0 text-center md:text-left"
        >
          {/* greeting badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 rounded-full
                       bg-blue-500/10 border border-blue-500/20 text-blue-300 text-sm font-medium"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400" />
            </span>
            Available for opportunities
          </motion.div>

          {/* heading */}
          <h2 className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl leading-tight">
            Hi, I am{' '}
            <span className="block mt-2 min-h-[1.2em] text-transparent bg-clip-text
                             bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-500">
              <Typewriter
                words={['Chaitanya', 'a Software Developer', 'a Computer Engineer']}
                loop={0}
                cursor
                cursorStyle="|"
                typeSpeed={70}
                deleteSpeed={50}
                delaySpeed={1000}
              />
            </span>
          </h2>

          {/* description */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="mt-6 text-base text-gray-400 sm:text-lg sm:max-w-xl sm:mx-auto md:mx-0 md:text-xl leading-relaxed"
          >
            Engineering student at{' '}
            <span className="text-white font-semibold">COEP</span> who builds
            efficient systems, solves problems rigorously, and ships practical
            tech across{' '}
            <span className="text-blue-400">C/C++</span>,{' '}
            <span className="text-cyan-400">Web</span>, and{' '}
            <span className="text-purple-400">ML</span>.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="mt-8 flex flex-wrap justify-center md:justify-start gap-4"
          >
            <motion.a
              whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(59,130,246,0.5)' }}
              whileTap={{ scale: 0.95 }}
              href="/My_resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative px-8 py-3.5 text-base font-semibold rounded-xl text-white
                         bg-gradient-to-r from-blue-600 to-blue-500 md:text-lg
                         shadow-lg shadow-blue-500/25 transition-all overflow-hidden"
            >
              {/* shimmer effect */}
              <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full
                               transition-transform duration-700 bg-gradient-to-r
                               from-transparent via-white/20 to-transparent" />
              <span className="relative flex items-center gap-2">
                📄 View Resume
              </span>
            </motion.a>

            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="#contact"
              className="px-8 py-3.5 text-base font-semibold rounded-xl text-gray-300
                         border border-gray-600 hover:text-white hover:border-blue-500/50
                         hover:bg-blue-500/10 md:text-lg transition-all duration-300"
            >
              💬 Contact Me
            </motion.a>
          </motion.div>

          {/* social links */}
          
        </motion.div>

        {/* ═══════════ IMAGE SIDE ═══════════ */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="md:w-1/2 flex justify-center"
        >
          <div className="relative">
            {/* pulsing glow ring behind image */}
            <motion.div
              animate={{ scale: [1, 1.05, 1], opacity: [0.3, 0.6, 0.3] }}
              transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
              className="absolute -inset-4 rounded-full bg-gradient-to-r from-blue-500 via-cyan-500 to-purple-500 blur-2xl"
            />

            {/* rotating dashed border ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 20, ease: 'linear' }}
              className="absolute -inset-3 rounded-full border-2 border-dashed border-blue-500/30"
            />

            {/* orbiting dot */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 8, ease: 'linear' }}
              className="absolute -inset-4 rounded-full"
              style={{ transformOrigin: 'center center' }}
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-blue-400 shadow-[0_0_12px_rgba(96,165,250,0.8)]" />
            </motion.div>

            {/* floating image */}
            <motion.div
              animate={{ y: [0, -15, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
              className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden
                         border-2 border-blue-400/50
                         shadow-[0_0_60px_rgba(59,130,246,0.4)]"
            >
              <img
                src={image}
                alt="Chaitanya Puranik"
                className="w-full h-full object-cover"
              />
              {/* inner shine overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 via-transparent to-purple-500/10" />
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* ── scroll indicator ── */}
      {/* <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs text-gray-500 tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
          className="w-5 h-8 rounded-full border-2 border-gray-600 flex justify-center pt-1.5"
        >
          <div className="w-1 h-1.5 rounded-full bg-gray-400" />
        </motion.div>
      </motion.div> */}
    </section>
  );
};

export default Hero;