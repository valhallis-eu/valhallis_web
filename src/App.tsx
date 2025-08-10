import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  const { t: _t } = useTranslation();
  const [currentSection, setCurrentSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'services', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setCurrentSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-background-light">
      <Header 
        currentSection={currentSection} 
        onSectionChange={scrollToSection}
      />
      
      <main>
        <section id="home" className="relative">
          <Hero />
        </section>

        <section id="about" className="section-padding bg-white">
          <About />
        </section>

        <section id="services" className="section-padding bg-gray-50">
          <Services />
        </section>



        <section id="contact" className="section-padding bg-primary-navy text-white">
          <Contact />
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default App; 