import { About } from './components/About';
import { AwardsGallery } from './components/AwardsGallery';
import { Certifications } from './components/Certifications';
import { Contact } from './components/Contact';
import { Education } from './components/Education';
import { Experience } from './components/Experience';
import { Footer } from './components/Footer';
import { Hero } from './components/Hero';
import { Navbar } from './components/Navbar';
import { Projects } from './components/Projects';
import { Skills } from './components/Skills';

export default function App() {
  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Navbar />
      <main id="main" tabIndex={-1} className="outline-none">
        <Hero />
        <About />
        <Education />
        <Experience />
        <Skills />
        <Projects />
        <AwardsGallery />
        <Certifications />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
