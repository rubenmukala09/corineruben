import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { ChevronDown, HelpCircle, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useFaqs } from '@/hooks/useSiteContent';

const FAQ = () => {
  const { language, t } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const { faqs } = useFaqs();

  const getQ = (faq: typeof faqs[number]) => {
    if (language === 'fr' && faq.question_fr) return faq.question_fr;
    if (language === 'es' && faq.question_es) return faq.question_es;
    return faq.question;
  };

  const getA = (faq: typeof faqs[number]) => {
    if (language === 'fr' && faq.answer_fr) return faq.answer_fr;
    if (language === 'es' && faq.answer_es) return faq.answer_es;
    return faq.answer;
  };

  return (
    <div className="min-h-screen pt-28 pb-20 relative">
      <div className="container mx-auto px-6 md:px-12 max-w-2xl relative z-10">

        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block px-5 py-2 rounded-full glass-card-strong mb-5">
            <p className="font-sans-elegant text-xs tracking-[0.25em] uppercase text-muted-foreground font-medium">{t('faq.badge')}</p>
          </div>
          <h1 className="font-serif-display text-4xl md:text-6xl text-foreground mb-4 font-semibold" style={{ letterSpacing: '-0.5px' }}>
            {t('faq.title')}
          </h1>
          <p className="font-sans-elegant text-base text-muted-foreground">{t('faq.subtitle')}</p>
        </div>

        <div className="glass-card-strong rounded-3xl overflow-hidden divide-y divide-border/30 mb-10">
          {faqs.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <div key={item.id}>
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-4 px-7 py-5 text-left hover:bg-white/5 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-full gradient-primary flex items-center justify-center flex-shrink-0">
                      <HelpCircle className="w-3.5 h-3.5 text-primary-foreground" />
                    </div>
                    <span className="font-sans-elegant text-sm font-semibold text-foreground">
                      {getQ(item)}
                    </span>
                  </div>
                  <div className={`flex-shrink-0 transition-transform duration-250 ${isOpen ? 'rotate-180' : ''}`}>
                    <ChevronDown className="w-4 h-4 text-muted-foreground" />
                  </div>
                </button>

                {isOpen && (
                  <div className="overflow-hidden">
                    <div className="px-7 pb-5 pl-[3.75rem]">
                      <p className="font-sans-elegant text-sm text-muted-foreground leading-relaxed">
                        {getA(item)}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still have questions CTA */}
        <div className="glass-card-strong rounded-3xl p-8 text-center">
          <div className="w-14 h-14 rounded-full gradient-primary flex items-center justify-center mx-auto mb-4">
            <Heart className="w-6 h-6 text-primary-foreground fill-primary-foreground" />
          </div>
          <h2 className="font-serif-display text-xl font-semibold text-foreground mb-2">{t('faq.stillQuestions')}</h2>
          <p className="font-sans-elegant text-sm text-muted-foreground mb-5">
            {language === 'fr' ? 'Notre équipe est là pour vous aider.' : language === 'es' ? 'Nuestro equipo está aquí para ayudarte.' : 'Our team is here to help.'}
          </p>
          <Link to="/enquiries" className="btn-primary inline-flex items-center gap-2">
            <HelpCircle className="w-4 h-4" />
            {t('faq.contactUs')}
          </Link>
        </div>

      </div>
    </div>
  );
};

export default FAQ;
