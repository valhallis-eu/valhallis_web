import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { X, Cookie, Shield, Settings } from 'lucide-react';

interface CookieBannerProps {
  onAccept?: () => void;
  onDecline?: () => void;
}

function CookieBanner({ onAccept, onDecline }: CookieBannerProps) {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    // Sprawdź czy użytkownik już zaakceptował cookies
    const cookiesAccepted = localStorage.getItem('cookiesAccepted');
    if (!cookiesAccepted) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookiesAccepted', 'true');
    setIsVisible(false);
    onAccept?.();
  };

  const handleDecline = () => {
    localStorage.setItem('cookiesAccepted', 'false');
    setIsVisible(false);
    onDecline?.();
  };

  const handleSettings = () => {
    setShowDetails(!showDetails);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-lg">
      <div className="max-w-7xl mx-auto p-4">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          {/* Main Content */}
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Cookie className="w-5 h-5 text-primary-gold" />
              <h3 className="text-lg font-semibold text-gray-900">
                {t('cookies.title', 'Polityka plików cookies')}
              </h3>
            </div>
            
            <p className="text-sm text-gray-600 mb-3">
              {t('cookies.description', 'Używamy plików cookies, aby zapewnić najlepsze doświadczenia na naszej stronie. Kontynuując przeglądanie, zgadzasz się na ich użycie.')}
            </p>

            {/* Cookie Types Details */}
            {showDetails && (
              <div className="bg-gray-50 p-4 rounded-lg mb-3">
                <h4 className="font-medium text-gray-900 mb-2">
                  {t('cookies.types.title', 'Rodzaje plików cookies:')}
                </h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-green-600" />
                    <strong>Niezbędne:</strong> {t('cookies.types.necessary', 'Wymagane do działania strony')}
                  </li>
                  <li className="flex items-center gap-2">
                    <Settings className="w-4 h-4 text-blue-600" />
                    <strong>Funkcjonalne:</strong> {t('cookies.types.functional', 'Zapamiętują Twoje preferencje')}
                  </li>
                  <li className="flex items-center gap-2">
                    <Cookie className="w-4 h-4 text-orange-600" />
                    <strong>Analityczne:</strong> {t('cookies.types.analytics', 'Pomagają nam ulepszać stronę')}
                  </li>
                </ul>
              </div>
            )}

            <div className="flex flex-wrap gap-2 text-xs">
              <button
                onClick={handleSettings}
                className="text-primary-gold hover:text-primary-navy underline"
              >
                {showDetails ? t('cookies.hideDetails', 'Ukryj szczegóły') : t('cookies.showDetails', 'Pokaż szczegóły')}
              </button>
              <span className="text-gray-400">|</span>
              <a
                href="/privacy-policy"
                className="text-primary-gold hover:text-primary-navy underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                {t('cookies.privacyPolicy', 'Polityka prywatności')}
              </a>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-2 min-w-fit">
            <button
              onClick={handleDecline}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-200"
            >
              {t('cookies.decline', 'Odrzuć')}
            </button>
            <button
              onClick={handleAccept}
              className="px-6 py-2 text-sm font-medium text-white bg-primary-gold hover:bg-primary-navy rounded-lg transition-colors duration-200"
            >
              {t('cookies.accept', 'Akceptuję wszystkie')}
            </button>
          </div>

          {/* Close Button */}
          <button
            onClick={handleDecline}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors duration-200"
            aria-label={t('cookies.close', 'Zamknij')}
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default CookieBanner;
