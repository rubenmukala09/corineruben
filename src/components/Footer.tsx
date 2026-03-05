import { useLanguage } from '@/contexts/LanguageContext';
import { Heart } from 'lucide-react';

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="relative overflow-hidden border-t border-border/40 py-12">
      <div className="floating-blob w-[300px] h-[300px] bg-primary/10 -bottom-40 left-1/2 -translate-x-1/2" />
      <div className="container mx-auto px-4 text-center relative z-10">
        <p className="font-serif-display text-3xl gradient-text font-semibold mb-3">C & R</p>
        <p className="font-serif-body text-base text-muted-foreground mb-2">15.08.2027</p>
        <p className="text-sm text-muted-foreground flex items-center justify-center gap-1.5">
          {t('footer.made')} <Heart className="w-3.5 h-3.5 text-accent fill-accent" /> {t('footer.copyright')}
        </p>
      </div>
    </footer>
  );
};

export default Footer;