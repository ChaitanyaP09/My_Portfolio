import React from 'react';
import { FaLinkedin, FaGithub } from 'react-icons/fa';
import { HiOutlineMail } from 'react-icons/hi';

const socials = [
  { icon: FaLinkedin, href: "https://www.linkedin.com/in/chaitanya-puranik-27994b356/", label: "LinkedIn" },
  { icon: FaGithub, href: "https://github.com/ChaitanyaP09", label: "GitHub" },
  { icon: HiOutlineMail, href: "mailto:chaitanyapuranik9@gmail.com", label: "Email" },
];

const Footer = () => {
  return (
    <footer id="contact" className="relative bg-[#04060f] font-['DM_Sans',sans-serif]">
      {/* Subtle structural border */}
      <div className="w-[90%] max-w-7xl mx-auto px-6">
        <div className="h-px bg-white/[0.06]" />
      </div>

      <div className="w-[90%] max-w-7xl mx-auto  pt-20 pb-12">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8 md:gap-6">
          
          {/* Left Block: Identity & Profile Sub-headline */}
          <div className="space-y-3">
            <h3 className="text-white font-['Syne',sans-serif] text-2xl font-extrabold tracking-tight">
              Chaitanya Puranik
            </h3>
            <div className="text-white/40 text-xs sm:text-sm font-light tracking-wide flex flex-wrap items-center gap-x-2 gap-y-1">
              <span>Software Developer</span>
              <span className="text-white/20 font-extrabold">·</span>
              <span>COEP Pune</span>
              <span className="text-white/20 font-extrabold">·</span>
              <span className="text-emerald-400/80 font-normal">Open to opportunities</span>
            </div>
          </div>

          {/* Right Block: Minimal Social Link Alignment */}
          <div className="flex items-center gap-8 pt-2">
            {socials.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm font-light text-white/40 hover:text-white transition-colors duration-200 cursor-none"
                data-hover
              >
                <Icon className="w-4 h-4" />
                <span className="tracking-wide">{label}</span>
              </a>
            ))}
          </div>

        </div>

        {/* Bottom Metadata Copyright Row */}
        <div className="mt-20 pt-6 border-t border-white/[0.04] flex flex-col sm:flex-row items-center justify-center gap-4 text-xs text-white/20 font-light tracking-wider">
          <p>© {new Date().getFullYear()} Chaitanya P</p>
          {/* <p>Built with React & Tailwind CSS</p> */}
        </div>
      </div>
    </footer>
  );
};

export default Footer;