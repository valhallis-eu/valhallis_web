import { useTranslation } from 'react-i18next';
import { Shield, Target, Award } from 'lucide-react';

function About() {
  const { t } = useTranslation();

  const values = [
    {
      icon: Shield,
      title: t('about.discretion'),
      description: t('about.discretionText'),
    },
    {
      icon: Target,
      title: t('about.precision'),
      description: t('about.precisionText'),
    },
    {
      icon: Award,
      title: t('about.excellence'),
      description: t('about.excellenceText'),
    },
  ];



  return (
    <div className="container-max">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-playfair font-bold text-primary-navy mb-6">
            {t('about.title')}
          </h2>
          <p className="text-xl text-primary-gold font-inter font-medium mb-4">
            {t('about.subtitle')}
          </p>
          <p className="text-lg text-gray-600 font-inter max-w-3xl mx-auto leading-relaxed">
            {t('about.description')}
          </p>
        </div>

        {/* Mission and Approach */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div className="card-emboss">
            <h3 className="text-2xl font-playfair font-bold text-primary-navy mb-4">
              {t('about.mission')}
            </h3>
            <p className="text-gray-600 font-inter leading-relaxed">
              {t('about.missionText')}
            </p>
          </div>

          <div className="card-emboss">
            <h3 className="text-2xl font-playfair font-bold text-primary-navy mb-4">
              {t('about.approach')}
            </h3>
            <p className="text-gray-600 font-inter leading-relaxed">
              {t('about.approachText')}
            </p>
          </div>
        </div>

        {/* Values */}
        <div className="mb-16">
          <h3 className="text-3xl font-playfair font-bold text-primary-navy text-center mb-12">
            {t('about.values')}
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div 
                key={index}
                className="text-center group"
              >
                <div className="w-20 h-20 bg-primary-gold/10 border border-primary-gold/30 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-primary-gold/20 transition-colors duration-300">
                  <value.icon className="w-10 h-10 text-primary-gold" />
                </div>
                <h4 className="text-xl font-playfair font-bold text-primary-navy mb-4">
                  {value.title}
                </h4>
                <p className="text-gray-600 font-inter leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>



        {/* Decorative Elements */}
        <div className="mt-16 pt-16 border-t border-gray-200">
          <div className="flex justify-center space-x-8 opacity-30">
            <div className="w-1 h-16 bg-primary-gold"></div>
            <div className="w-1 h-16 bg-primary-gold"></div>
            <div className="w-1 h-16 bg-primary-gold"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About; 