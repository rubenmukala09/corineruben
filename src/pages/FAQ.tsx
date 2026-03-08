import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle, Heart, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useFaqs } from '@/hooks/useSiteContent';

const FAQ = () => {
  const { language, t } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const { faqs, loading } = useFaqs();

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
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <div className="inline-block px-5 py-2 rounded-full glass-card-strong mb-5">
            <p className="font-sans-elegant text-xs tracking-[0.25em] uppercase text-muted-foreground font-medium">{t('faq.badge')}</p>
          </div>
          <h1 className="font-serif-display text-4xl md:text-6xl text-foreground mb-4 font-semibold" style={{ letterSpacing: '-0.5px' }}>
            {t('faq.title')}
          </h1>
          <p className="font-sans-elegant text-base text-muted-foreground">{t('faq.subtitle')}</p>
        </motion.div>

        {loading ? (
          <div className="flex justify-center py-12"><Loader2 className="w-6 h-6 animate-spin text-primary" /></div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}
            className="glass-card-strong rounded-3xl overflow-hidden divide-y divide-border/30 mb-10"
          >
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
                    <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.25 }} className="flex-shrink-0">
                      <ChevronDown className="w-4 h-4 text-muted-foreground" />
                    </motion.div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="overflow-hidden"
                      >
                        <div className="px-7 pb-5 pl-[3.75rem]">
                          <p className="font-sans-elegant text-sm text-muted-foreground leading-relaxed">
                            {getA(item)}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </motion.div>
        )}

        {/* Still have questions CTA */}
        <motion.div
          initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          className="glass-card-strong rounded-3xl p-8 text-center"
        >
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
        </motion.div>

      </div>
    </div>
  );
};

export default FAQ;
