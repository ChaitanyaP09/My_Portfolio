import Navbar from "./components/Navbar";
import Navmob from "./components/Navmob";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Footer from "./components/Footer";
import Education from "./components/Education";
import Experience from "./components/Experience";

// Import your canvas or background parts if you want them global, 
// or let them float freely behind the sections.
export default function App() {
  return (
    <div className="bg-[#04060f] text-slate-200 font-['DM_Sans',sans-serif] cursor-none overflow-x-hidden selection:bg-blue-500/30 min-h-screen relative">
      
      {/* GLOBAL BACKGROUND SCRIPT RESET */}
      {/* Moving your grid lines or particle canvases here ensures they cover the whole page height */}
      <div className="fixed inset-0 pointer-events-none z-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,black,transparent)] opacity-70" />

      <Navbar />
      {/* <Navmob /> */}
      
      {/* Content layers sit safely on top of the fixed animations */}
      <main className="relative z-10">
        <Hero />
        <About />
        <Experience/>
        <Skills />
        <Projects />
        <Education/>
        <Footer />
      </main>
    </div>
  );
}