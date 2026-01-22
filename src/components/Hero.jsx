import React from 'react';
import { motion } from 'framer-motion';
import { Typewriter } from 'react-simple-typewriter';
import image from '../assets/port1.jpeg'

const Hero = () => {
  return (
    <section id="home" className="pt-32 pb-20 bg-gradient-to-br from-gray-900 via-blue-900 to-black min-h-screen flex items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col-reverse md:flex-row items-center justify-between w-full">
        
        {/* Text Content */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="md:w-1/2 mt-10 md:mt-0 text-center md:text-left"
        >
          <h2 className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl mb-4">
            Hi, I am{' '}
            <span className="text-blue-400 block mt-2 min-h-[1.2em]">
              {/* Typewriter Effect */}
              <Typewriter
                words={['Chaitanya', 'a Software Developer', 'a Computer Engineer']}
                loop={0} // Infinite loop
                cursor
                cursorStyle='_'
                typeSpeed={70}
                deleteSpeed={50}
                delaySpeed={1000}
              />
            </span>
          </h2>
          <p className="mt-4 text-base text-gray-300 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mx-0 md:text-xl">
            Engineering student at COEP who builds efficient systems, solves problems rigorously, and ships practical tech across C/C++, web, and ML.
          </p>
          
          <div className="mt-8 flex justify-center md:justify-start gap-4">
            <motion.a 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="/Actual_Resume_one.pdf" 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg shadow-blue-500/30 shadow-lg"
            >
              View Resume
            </motion.a>
            <motion.a 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="#contact"
              className="px-8 py-3 border border-gray-500 text-base font-medium rounded-md text-gray-200 hover:text-white hover:border-white hover:bg-white/10 md:py-4 md:text-lg transition-all"
            >
              Contact Me
            </motion.a>
          </div>
        </motion.div>

        {/* Image with Floating Animation & Glow */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="md:w-1/2 flex justify-center"
        >
          <motion.div 
            animate={{ y: [0, -20, 0] }}
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
            className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-blue-500/50 shadow-[0_0_50px_rgba(59,130,246,0.5)]"
          >
            <img 
              src={image} 
              alt="Chaitanya Puranik" 
              className="w-full h-full object-cover"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;