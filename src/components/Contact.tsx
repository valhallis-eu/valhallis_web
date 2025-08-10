import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Send, Shield, Mail, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { sendConsultationRequest, sendConfirmationEmail, sendVerificationEmail } from '../lib/email';
import { emailConfig } from '../config/email';

function Contact() {
  const { t, i18n } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [emailVerified, setEmailVerified] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState<'idle' | 'sending' | 'sent' | 'error' | 'verified'>('idle');
  const [formStartMs] = useState<number>(() => Date.now());
  const [hp, setHp] = useState('');

  useEffect(() => {
    // Check if verify redirect stored email
    try {
      const stored = localStorage.getItem('emailVerified');
      if (stored) {
        const { email } = JSON.parse(stored);
        if (email) {
          // Restore form data from backup if available
          const formDataBackup = localStorage.getItem('formDataBackup');
          if (formDataBackup) {
            try {
              const backup = JSON.parse(formDataBackup);
              setFormData({ ...backup, email }); // Use backup data with verified email
              localStorage.removeItem('formDataBackup');
            } catch {
              // If backup parsing fails, just update email
              setFormData(prev => ({ ...prev, email }));
            }
          } else {
            // No backup, just update email
            setFormData(prev => ({ ...prev, email }));
          }
          setEmailVerified(true);
          setVerificationStatus('verified');
          localStorage.removeItem('emailVerified');
        }
      }
    } catch {}
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (name === 'email') {
      setEmailVerified(false);
      setVerificationStatus('idle');
    }
  };

  const handleSendVerification = async () => {
    if (!formData.email.trim() || !emailConfig.validation.emailRegex.test(formData.email)) return;
    try {
      setVerificationStatus('sending');
      // Save current form data before verification
      localStorage.setItem('formDataBackup', JSON.stringify(formData));
      const res = await sendVerificationEmail(formData.email, i18n.language);
      if (res.success) setVerificationStatus('sent');
      else setVerificationStatus('error');
    } catch {
      setVerificationStatus('error');
    }
  };

  const validateForm = (): boolean => {
    // Check required fields
    if (!formData.name.trim()) {
      return false;
    }
    if (!formData.email.trim()) {
      return false;
    }
    if (!formData.message.trim()) {
      return false;
    }
    
    // Validate email format
    if (!emailConfig.validation.emailRegex.test(formData.email)) {
      return false;
    }
    
    // Check message length
    if (formData.message.length > emailConfig.validation.maxMessageLength) {
      return false;
    }
    
    // Honeypot (should be empty)
    if (hp.trim().length > 0) {
      return false;
    }
    // Minimal fill time (2 seconds)
    if (Date.now() - formStartMs < 2000) {
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      setSubmitStatus('error');
      return;
    }
    
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Send consultation request to VALHALLIS ADVISORS (with anti-spam fields)
      const consultationResult = await sendConsultationRequest({ ...formData, hp, formStartMs }, i18n.language);
      
      if (consultationResult.success) {
        // Send confirmation email to the user
        await sendConfirmationEmail(formData.email, formData.name, i18n.language);
        
        setSubmitStatus('success');
        setFormData({ name: '', email: '', company: '', message: '' });
        setHp('');
        setEmailVerified(false);
        setVerificationStatus('idle');
        
        // Reset success message after 5 seconds
        setTimeout(() => setSubmitStatus('idle'), 5000);
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container-max">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-playfair font-bold text-white mb-6">
            {t('contact.title')}
          </h2>
          <p className="text-xl text-primary-gold font-inter font-medium mb-4">
            {t('contact.subtitle')}
          </p>
          <p className="text-lg text-gray-300 font-inter max-w-3xl mx-auto leading-relaxed">
            {t('contact.description')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white/10 backdrop-blur-sm p-8 rounded-lg border border-white/20">
            <h3 className="text-2xl font-playfair font-bold text-white mb-6">
              {t('contact.form.name')}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-white font-inter font-medium mb-2">
                  {t('contact.form.name')} <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-none text-white placeholder-gray-300 focus:outline-none focus:border-primary-gold transition-colors duration-200"
                  placeholder={t('contact.placeholderName')}
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-white font-inter font-medium mb-2">
                  {t('contact.form.email')} <span className="text-red-400">*</span>
                </label>
                <div className="relative">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className={`w-full px-4 py-3 bg-white/10 border rounded-none text-white placeholder-gray-300 focus:outline-none transition-colors duration-200 ${emailVerified ? 'border-green-500 focus:border-green-500' : 'border-white/30 focus:border-primary-gold'}`}
                    placeholder={t('contact.placeholderEmail')}
                  />
                  {emailVerified && (
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    </div>
                  )}
                </div>
                {formData.email && emailConfig.validation.emailRegex.test(formData.email) && !emailVerified && (
                  <div className="mt-3 p-3 bg-yellow-500/10 border border-yellow-500/30 rounded">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <AlertCircle className="w-4 h-4 text-yellow-500" />
                        <span className="text-yellow-300 text-sm">
                          {t('contact.form.verificationRequired')}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={handleSendVerification}
                        disabled={verificationStatus === 'sending'}
                        className="text-xs bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-300 px-3 py-1 rounded transition-colors duration-200 disabled:opacity-50"
                      >
                        {verificationStatus === 'sending' ? t('contact.form.sending') : t('contact.form.sendVerification')}
                      </button>
                    </div>
                  </div>
                )}
                {verificationStatus === 'sent' && !emailVerified && (
                  <div className="mt-3 p-3 bg-blue-500/10 border border-blue-500/30 rounded">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-blue-400" />
                      <span className="text-blue-300 text-sm">{t('contact.form.verificationSent')}</span>
                    </div>
                  </div>
                )}
                {verificationStatus === 'error' && !emailVerified && (
                  <div className="mt-3 p-3 bg-red-500/10 border border-red-500/30 rounded">
                    <div className="flex items-center space-x-2">
                      <AlertCircle className="w-4 h-4 text-red-500" />
                      <span className="text-red-300 text-sm">{t('contact.form.verificationError')}</span>
                    </div>
                  </div>
                )}
              </div>

              <div>
                <label htmlFor="company" className="block text-white font-inter font-medium mb-2">
                  {t('contact.form.company')}
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-none text-white placeholder-gray-300 focus:outline-none focus:border-primary-gold transition-colors duration-200"
                  placeholder={t('contact.placeholderCompany')}
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-white font-inter font-medium mb-2">
                  {t('contact.form.message')} <span className="text-red-400">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={5}
                  maxLength={emailConfig.validation.maxMessageLength}
                  className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-none text-white placeholder-gray-300 focus:outline-none focus:border-primary-gold transition-colors duration-200 resize-none"
                  placeholder={t('contact.placeholderMessage')}
                />
                <div className="text-right text-xs text-gray-400 mt-1">
                  {formData.message.length}/{emailConfig.validation.maxMessageLength} {t('contact.form.characters')}
                </div>
              </div>

              {/* Honeypot field */}
              <input
                type="text"
                name="hp"
                value={hp}
                onChange={(e) => setHp(e.target.value)}
                tabIndex={-1}
                autoComplete="off"
                className="hidden"
                aria-hidden="true"
              />

              <button
                type="submit"
                disabled={isSubmitting || !emailVerified || !formData.name.trim() || !formData.email.trim() || !formData.message.trim()}
                className="w-full btn-primary flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>{t('contact.form.sending')}</span>
                  </>
                ) : (
                  <>
                    <Send size={20} />
                    <span>{t('contact.form.submit')}</span>
                  </>
                )}
              </button>

              {/* Status Messages */}
              {submitStatus === 'success' && (
                <div className="p-4 bg-green-500/20 border border-green-500/30 text-green-300 rounded">
                  {t('contact.form.success')}
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="p-4 bg-red-500/20 border border-red-500/30 text-red-300 rounded">
                  {t('contact.form.error')}
                </div>
              )}
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-playfair font-bold text-white mb-6">
                {t('contact.info.title')}
              </h3>
              <p className="text-gray-300 font-inter leading-relaxed mb-8">
                {t('contact.info.description')}
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-primary-gold/20 border border-primary-gold/30 rounded-full flex items-center justify-center flex-shrink-0">
                  <Shield className="w-6 h-6 text-primary-gold" />
                </div>
                <div>
                  <h4 className="text-white font-inter font-semibold mb-2">{t('contact.info.confidentiality.title')}</h4>
                  <p className="text-gray-300 text-sm">{t('contact.info.confidentiality.description')}</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-primary-gold/20 border border-primary-gold/30 rounded-full flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-primary-gold" />
                </div>
                <div>
                  <h4 className="text-white font-inter font-semibold mb-2">{t('contact.info.emailCommunication.title')}</h4>
                  <p className="text-gray-300 text-sm">{t('contact.info.emailCommunication.description')}</p>
                  <p className="text-gray-300 text-sm">{t('contact.info.emailResponse')}</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-primary-gold/20 border border-primary-gold/30 rounded-full flex items-center justify-center flex-shrink-0">
                  <Clock className="w-6 h-6 text-primary-gold" />
                </div>
                <div>
                  <h4 className="text-white font-inter font-semibold mb-2">{t('contact.info.globalAvailability.title')}</h4>
                  <p className="text-gray-300 text-sm">{t('contact.info.globalAvailability.description')}</p>
                </div>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="pt-8 border-t border-white/20">
              <div className="flex space-x-4 opacity-30">
                <div className="w-1 h-16 bg-primary-gold"></div>
                <div className="w-1 h-16 bg-primary-gold"></div>
                <div className="w-1 h-16 bg-primary-gold"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact; 