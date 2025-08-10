import { useTranslation } from 'react-i18next';
import i18n from 'i18next';
import { Eye, Shield, Search, Brain } from 'lucide-react';

function Services() {
  const { t } = useTranslation();

  const services = [
    {
      icon: Eye,
      title: t('services.competitiveIntelligence.title'),
      question: t('services.competitiveIntelligence.question'),
      description: t('services.competitiveIntelligence.description'),
    },
    {
      icon: Shield,
      title: t('services.riskAssessment.title'),
      question: t('services.riskAssessment.question'),
      description: t('services.riskAssessment.description'),
    },
    {
      icon: Search,
      title: t('services.dueDiligence.title'),
      question: t('services.dueDiligence.question'),
      description: t('services.dueDiligence.description'),
    },
    {
      icon: Brain,
      title: t('services.strategicConsulting.title'),
      question: t('services.strategicConsulting.question'),
      description: t('services.strategicConsulting.description'),
    },
  ];

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="container-max">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-playfair font-bold text-primary-navy mb-6">
            {t('services.title')}
          </h2>
          <p className="text-xl text-primary-gold font-inter font-medium mb-4">
            {t('services.subtitle')}
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {services.map((service, index) => (
            <div 
              key={index}
              className="card-emboss group hover:shadow-premium transition-all duration-500 cursor-pointer"
              onClick={scrollToContact}
            >
              <div className="flex items-start space-x-4">
                <div className="w-16 h-16 bg-primary-gold/10 border border-primary-gold/30 rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-primary-gold/20 transition-colors duration-300">
                  <service.icon className="w-8 h-8 text-primary-gold" />
                </div>
                
                <div className="flex-1">
                  <h3 className="text-2xl font-playfair font-bold text-primary-navy mb-3 group-hover:text-primary-gold transition-colors duration-300">
                    {service.title}
                  </h3>
                  
                  <p className="text-lg font-inter font-semibold text-primary-gold mb-4 italic">
                    {service.question}
                  </p>
                  
                  <p className="text-gray-600 font-inter leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </div>

              {/* Hover Effect */}
              <div className="mt-6 pt-6 border-t border-gray-200 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="flex items-center text-primary-gold font-inter font-medium">
                  <span>{t('services.learnMore')}</span>
                  <div className="ml-2 w-4 h-4 border-r-2 border-t-2 border-primary-gold transform rotate-45"></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Detailed Services Description */}
        <div className="mb-16">
          <div className="bg-white card-emboss p-8 md:p-12">
            <h3 className="text-3xl font-playfair font-bold text-primary-navy mb-8 text-center">
              {i18n.language === 'pl' ? 'W ramach naszych usług oferujemy:' : 'Within our services, we offer:'}
            </h3>
            
            <div className="space-y-8">
              {/* Service 1 */}
              <div className="border-l-4 border-primary-gold pl-6">
                <h4 className="text-xl font-playfair font-bold text-primary-navy mb-3">
                  {i18n.language === 'pl' ? '1. Ocena wiarygodności kontrahentów' : '1. Contractor Credibility Assessment'}
                </h4>
                <p className="text-gray-600 font-inter leading-relaxed">
                  {i18n.language === 'pl' 
                    ? 'Weryfikujemy wypłacalność, historię płatniczą, zadłużenie oraz status prawny potencjalnych i obecnych partnerów biznesowych. Pomagamy unikać współpracy z nierzetelnymi firmami i minimalizować ryzyko finansowe.'
                    : 'We verify solvency, payment history, debt, and legal status of potential and current business partners. We help avoid cooperation with unreliable companies and minimize financial risk.'
                  }
                </p>
              </div>

              {/* Service 2 */}
              <div className="border-l-4 border-primary-gold pl-6">
                <h4 className="text-xl font-playfair font-bold text-primary-navy mb-3">
                  {i18n.language === 'pl' ? '2. Analiza finansowa' : '2. Financial Analysis'}
                </h4>
                <p className="text-gray-600 font-inter leading-relaxed">
                  {i18n.language === 'pl'
                    ? 'Przeprowadzamy szczegółową analizę sprawozdań finansowych, bilansów oraz rachunków zysków i strat, oceniając stabilność oraz kondycję finansową przedsiębiorstw.'
                    : 'We conduct detailed analysis of financial statements, balance sheets, and profit and loss accounts, assessing the stability and financial condition of enterprises.'
                  }
                </p>
              </div>

              {/* Service 3 */}
              <div className="border-l-4 border-primary-gold pl-6">
                <h4 className="text-xl font-playfair font-bold text-primary-navy mb-3">
                  {i18n.language === 'pl' ? '3. Monitorowanie zmian' : '3. Change Monitoring'}
                </h4>
                <p className="text-gray-600 font-inter leading-relaxed">
                  {i18n.language === 'pl'
                    ? 'Na bieżąco śledzimy zmiany w statusie prawnym, finansowym i własnościowym firm, informując klientów o istotnych wydarzeniach mogących mieć wpływ na ich działalność.'
                    : 'We continuously track changes in the legal, financial, and ownership status of companies, informing clients about significant events that may impact their operations.'
                  }
                </p>
              </div>

              {/* Service 4 */}
              <div className="border-l-4 border-primary-gold pl-6">
                <h4 className="text-xl font-playfair font-bold text-primary-navy mb-3">
                  {i18n.language === 'pl' ? '4. Weryfikacja danych' : '4. Data Verification'}
                </h4>
                <p className="text-gray-600 font-inter leading-relaxed">
                  {i18n.language === 'pl'
                    ? 'Sprawdzamy autentyczność i kompletność danych podawanych przez firmy oraz osoby fizyczne, weryfikując m.in. rejestry dłużników, KRS, CEIDG czy inne publiczne źródła informacji.'
                    : 'We verify the authenticity and completeness of data provided by companies and individuals, checking debt registers, business registries, and other public information sources.'
                  }
                </p>
              </div>

              {/* Service 5 */}
              <div className="border-l-4 border-primary-gold pl-6">
                <h4 className="text-xl font-playfair font-bold text-primary-navy mb-3">
                  {i18n.language === 'pl' ? '5. Identyfikacja powiązań kapitałowych i osobowych' : '5. Capital and Personal Relationship Identification'}
                </h4>
                <p className="text-gray-600 font-inter leading-relaxed">
                  {i18n.language === 'pl'
                    ? 'Analizujemy struktury właścicielskie i personalne, pomagając odkryć rzeczywistych beneficjentów oraz powiązania z innymi podmiotami, co pozwala uniknąć współpracy z firmami-słupami lub podmiotami o wątpliwej reputacji.'
                    : 'We analyze ownership and personal structures, helping to uncover real beneficiaries and connections with other entities, which allows avoiding cooperation with shell companies or entities with questionable reputation.'
                  }
                </p>
              </div>

              {/* Service 6 */}
              <div className="border-l-4 border-primary-gold pl-6">
                <h4 className="text-xl font-playfair font-bold text-primary-navy mb-3">
                  {i18n.language === 'pl' ? '6. Raporty branżowe i rynkowe' : '6. Industry and Market Reports'}
                </h4>
                <p className="text-gray-600 font-inter leading-relaxed">
                  {i18n.language === 'pl'
                    ? 'Przygotowujemy analizy sektorowe, raporty o trendach rynkowych oraz konkurencji, wspierając klientów w podejmowaniu strategicznych decyzji biznesowych.'
                    : 'We prepare sector analyses, reports on market trends and competition, supporting clients in making strategic business decisions.'
                  }
                </p>
              </div>

              {/* Service 7 */}
              <div className="border-l-4 border-primary-gold pl-6">
                <h4 className="text-xl font-playfair font-bold text-primary-navy mb-3">
                  {i18n.language === 'pl' ? '7. Kontrola i weryfikacja pracowników' : '7. Employee Control and Verification'}
                </h4>
                <p className="text-gray-600 font-inter leading-relaxed mb-4">
                  {i18n.language === 'pl'
                    ? 'Oferujemy kompleksowe usługi związane z kontrolą pracowników, obejmujące:'
                    : 'We offer comprehensive employee control services, including:'
                  }
                </p>
                <ul className="text-gray-600 font-inter leading-relaxed space-y-2 ml-6">
                  <li className="flex items-start">
                    <span className="text-primary-gold mr-2">•</span>
                    {i18n.language === 'pl'
                      ? 'sprawdzanie kandydatów do pracy (weryfikacja CV, kwalifikacji, referencji, rejestrów karnych i dłużników),'
                      : 'checking job candidates (CV verification, qualifications, references, criminal and debt registers),'
                    }
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary-gold mr-2">•</span>
                    {i18n.language === 'pl'
                      ? 'analizę lojalności i uczciwości zatrudnionych osób (wykrywanie konfliktów interesów, powiązań z konkurencją, ryzyka wycieku informacji),'
                      : 'analysis of loyalty and integrity of employed persons (detecting conflicts of interest, connections with competition, risk of information leakage),'
                    }
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary-gold mr-2">•</span>
                    {i18n.language === 'pl'
                      ? 'monitorowanie działań pracowników pod kątem nadużyć, kradzieży czy działań na szkodę firmy,'
                      : 'monitoring employee actions for abuse, theft, or actions harmful to the company,'
                    }
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary-gold mr-2">•</span>
                    {i18n.language === 'pl'
                      ? 'audyty personalne i ocenę zgodności działań kadry z wewnętrznymi procedurami.'
                      : 'personal audits and assessment of staff compliance with internal procedures.'
                    }
                  </li>
                </ul>
              </div>

              {/* Service 8 */}
              <div className="border-l-4 border-primary-gold pl-6">
                <h4 className="text-xl font-playfair font-bold text-primary-navy mb-3">
                  {i18n.language === 'pl' ? '8. Usługi IT i cyberbezpieczeństwo' : '8. IT Services and Cybersecurity'}
                </h4>
                <p className="text-gray-600 font-inter leading-relaxed mb-4">
                  {i18n.language === 'pl'
                    ? 'Dbamy o najwyższy poziom bezpieczeństwa informatycznego zarówno wewnątrz naszej organizacji, jak i w ramach realizowanych usług dla klientów. Oferujemy:'
                    : 'We ensure the highest level of IT security both within our organization and in the services provided to clients. We offer:'
                  }
                </p>
                <ul className="text-gray-600 font-inter leading-relaxed space-y-2 ml-6">
                  <li className="flex items-start">
                    <span className="text-primary-gold mr-2">•</span>
                    {i18n.language === 'pl'
                      ? 'audyty bezpieczeństwa IT, wdrażanie polityk ochrony danych oraz systemów zabezpieczeń przed cyberzagrożeniami,'
                      : 'IT security audits, implementation of data protection policies and security systems against cyber threats,'
                    }
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary-gold mr-2">•</span>
                    {i18n.language === 'pl'
                      ? 'monitorowanie infrastruktury IT pod kątem potencjalnych incydentów i nieautoryzowanych działań,'
                      : 'monitoring IT infrastructure for potential incidents and unauthorized actions,'
                    }
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary-gold mr-2">•</span>
                    {i18n.language === 'pl'
                      ? 'wsparcie w zakresie ochrony przed wyciekiem danych, phishingiem oraz innymi zagrożeniami cyfrowymi,'
                      : 'support in protecting against data leakage, phishing, and other digital threats,'
                    }
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary-gold mr-2">•</span>
                    {i18n.language === 'pl'
                      ? 'wykorzystanie zaawansowanych narzędzi informatycznych do analizy danych, monitoringu oraz raportowania.'
                      : 'utilization of advanced IT tools for data analysis, monitoring, and reporting.'
                    }
                  </li>
                </ul>
              </div>
            </div>

            {/* Why Choose Us Section */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <h4 className="text-2xl font-playfair font-bold text-primary-navy mb-4 text-center">
                {i18n.language === 'pl' 
                  ? 'Dlaczego VALHALLIS ADVISORS?' 
                  : 'Why VALHALLIS ADVISORS?'
                }
              </h4>
              <p className="text-gray-600 font-inter leading-relaxed text-center">
                {i18n.language === 'pl'
                  ? 'Dostarczamy kluczowych informacji, które pozwalają unikać ryzykownych decyzji, chronić interesy firmy, zwiększać bezpieczeństwo transakcji oraz budować przewagę konkurencyjną na rynku.'
                  : 'We provide key information that allows you to avoid risky decisions, protect company interests, increase transaction security, and build a competitive advantage in the market.'
                }
              </p>
            </div>
          </div>
        </div>



        {/* Decorative Elements */}
        <div className="mt-16 flex justify-center space-x-4 opacity-20">
          <div className="w-2 h-2 bg-primary-gold rounded-full"></div>
          <div className="w-2 h-2 bg-primary-gold rounded-full"></div>
          <div className="w-2 h-2 bg-primary-gold rounded-full"></div>
        </div>
      </div>
    </div>
  );
}

export default Services; 