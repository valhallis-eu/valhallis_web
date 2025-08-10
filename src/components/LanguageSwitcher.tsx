import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';
import { useState } from 'react';

function LanguageSwitcher() {
  const { i18n, t: _t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const languages = [
    { code: 'pl', name: 'Polski', flag: '🇵🇱' },
    { code: 'en', name: 'English', flag: '🇺🇸' },
  ];

  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];

  const handleLanguageChange = (languageCode: string) => {
    i18n.changeLanguage(languageCode);
    setIsOpen(false);
    
    // Update HTML lang attribute
    document.documentElement.lang = languageCode;
    
    // Store preference in localStorage
    localStorage.setItem('i18nextLng', languageCode);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 text-white hover:text-primary-gold transition-colors duration-200 rounded-md hover:bg-white/10"
        aria-label="Language switcher"
      >
        <Globe size={16} />
        <span className="text-sm font-medium">{currentLanguage.flag}</span>
        <span className="text-sm font-medium hidden sm:inline">{currentLanguage.name}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-50">
          <div className="py-1">
            {languages.map((language) => (
              <button
                key={language.code}
                onClick={() => handleLanguageChange(language.code)}
                className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 transition-colors duration-200 flex items-center space-x-3 ${
                  i18n.language === language.code 
                    ? 'text-primary-gold bg-primary-gold/10' 
                    : 'text-gray-700'
                }`}
              >
                <span className="text-lg">{language.flag}</span>
                <span className="font-medium">{language.name}</span>
                {i18n.language === language.code && (
                  <span className="ml-auto text-primary-gold">✓</span>
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Backdrop to close dropdown when clicking outside */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}

export default LanguageSwitcher; 