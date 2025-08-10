import { useTranslation } from 'react-i18next';
import { ChevronDown } from 'lucide-react';
import Logo from './Logo';

function Hero() {
  const { t } = useTranslation();



  return (
    <div className="relative min-h-screen bg-gradient-to-br from-primary-navy via-background-dark to-primary-navy flex items-center justify-center overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-32 h-32 border border-primary-gold/30 rotate-45"></div>
        <div className="absolute top-40 right-32 w-24 h-24 border border-primary-gold/20 rotate-12"></div>
        <div className="absolute bottom-32 left-1/4 w-16 h-16 border border-primary-gold/25 rotate-90"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 border border-primary-gold/15 rotate-180"></div>
      </div>

      {/* Content */}
      <div className="container-max px-6 text-center relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Logo */}
          <div className="flex justify-center mb-16">
            <Logo 
              variant="white" 
              size="3xl" 
              className="md:scale-110 lg:scale-125 xl:scale-150 animate-fade-in hover:animate-glow transition-all duration-300" 
            />
          </div>
          
          {/* Main Title */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-playfair font-bold text-white mb-6 leading-tight">
            {t('hero.title')}
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-primary-gold font-inter font-medium mb-8">
            {t('hero.subtitle')}
          </p>

          {/* Description */}
          <p className="text-lg md:text-xl text-gray-300 font-inter mb-12 max-w-3xl mx-auto leading-relaxed">
            {t('hero.description')}
          </p>


        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <button
          onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
          className="text-white hover:text-primary-gold transition-colors duration-200"
          aria-label={t('hero.scrollText')}
        >
          <ChevronDown size={24} />
        </button>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-1/4 right-10 w-2 h-2 bg-primary-gold rounded-full animate-pulse"></div>
      <div className="absolute bottom-1/3 left-10 w-1 h-1 bg-primary-gold rounded-full animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 right-1/4 w-1 h-1 bg-primary-gold rounded-full animate-pulse delay-500"></div>
    </div>
  );
}

export default Hero; 