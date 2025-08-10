import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Menu, X } from 'lucide-react';
import Logo from './Logo';
import LanguageSwitcher from './LanguageSwitcher';

interface HeaderProps {
  currentSection: string;
  onSectionChange: (sectionId: string) => void;
}

function Header({ currentSection, onSectionChange }: HeaderProps) {
  const { t } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: t('nav.home') },
    { id: 'about', label: t('nav.about') },
    { id: 'services', label: t('nav.services') },
    { id: 'contact', label: t('nav.contact') },
  ];

  const handleNavClick = (sectionId: string) => {
    onSectionChange(sectionId);
    setIsMenuOpen(false);
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-sm shadow-lg border-b border-gray-200' 
          : 'bg-transparent'
      }`}
    >
      <div className="container-max px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Logo 
            variant={isScrolled ? 'default' : 'white'} 
            size="md"
            onClick={() => onSectionChange('home')}
            className="transition-opacity duration-300"
          />

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`font-inter font-medium transition-colors duration-200 ${
                  currentSection === item.id
                    ? 'text-primary-gold'
                    : isScrolled
                    ? 'text-primary-navy hover:text-primary-gold'
                    : 'text-white hover:text-primary-gold'
                }`}
              >
                {item.label}
              </button>
            ))}
            
            {/* Language Switcher */}
            <LanguageSwitcher />
          </nav>

          {/* Mobile Menu Button and Language Switcher */}
          <div className="md:hidden flex items-center space-x-2">
            <LanguageSwitcher />
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`p-2 transition-colors duration-200 ${
                isScrolled ? 'text-primary-navy' : 'text-white'
              }`}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200">
            <nav className="py-4 space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`block w-full text-left px-6 py-3 font-inter font-medium transition-colors duration-200 ${
                    currentSection === item.id
                      ? 'text-primary-gold bg-primary-navy/5'
                      : 'text-primary-navy hover:text-primary-gold hover:bg-gray-50'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header; 