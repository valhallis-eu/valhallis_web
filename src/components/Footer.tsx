import { useTranslation } from 'react-i18next';
import Logo from './Logo';

function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-background-dark text-white py-12">
      <div className="container-max">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {/* Company Info */}
            <div>
              <div className="mb-4">
                <Logo variant="white" size="sm" />
              </div>
              <p className="text-gray-400 font-inter text-sm leading-relaxed">
                {t('footer.description')}
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-inter font-semibold text-white mb-4">{t('footer.services')}</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <button 
                    onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
                    className="text-gray-400 hover:text-primary-gold transition-colors duration-200"
                  >
                    {t('footer.competitiveIntelligence')}
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
                    className="text-gray-400 hover:text-primary-gold transition-colors duration-200"
                  >
                    {t('footer.riskAssessment')}
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
                    className="text-gray-400 hover:text-primary-gold transition-colors duration-200"
                  >
                    {t('footer.dueDiligence')}
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
                    className="text-gray-400 hover:text-primary-gold transition-colors duration-200"
                  >
                    {t('footer.strategicConsulting')}
                  </button>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-lg font-inter font-semibold text-white mb-4">{t('footer.contact')}</h4>
              <button 
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="text-gray-400 hover:text-primary-gold transition-colors duration-200 text-sm"
              >
                {t('footer.requestConsultation')}
              </button>
              <p className="text-gray-400 text-sm mt-2">
                {t('footer.confidentialInquiries')}
              </p>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-800 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <p className="text-gray-400 text-sm font-inter">
                {t('footer.copyright')}
              </p>
              
              <div className="flex space-x-6 text-sm">
                <button className="text-gray-400 hover:text-primary-gold transition-colors duration-200">
                  {t('footer.privacy')}
                </button>
                <button className="text-gray-400 hover:text-primary-gold transition-colors duration-200">
                  {t('footer.terms')}
                </button>
              </div>
            </div>
          </div>

          {/* Decorative Elements */}
          <div className="mt-8 flex justify-center">
            <div className="flex space-x-2 opacity-20">
              <div className="w-1 h-8 bg-primary-gold"></div>
              <div className="w-1 h-8 bg-primary-gold"></div>
              <div className="w-1 h-8 bg-primary-gold"></div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer; 