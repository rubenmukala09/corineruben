import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Heart, Instagram, Mail, MapPin } from 'lucide-react';
import flowersImg from '@/assets/flowers-lavender.jpg';

const Footer = () => {
  const { t } = useLanguage();

  const quickLinks = [
    { label: t('nav.home'), to: '/' },
    { label: t('nav.story'), to: '/story' },
    { label: t('nav.details'), to: '/details' },
  ];

  const moreLinks = [
    { label: t('nav.rsvp'), to: '/rsvp' },
    { label: t('nav.gallery'), to: '/gallery' },
    { label: t('nav.registry'), to: '/registry' },
  ];

  return (
    <footer className="footer-dark relative overflow-hidden">
      {/* Subtle decorative gradient overlay */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[300px] rounded-full bg-primary/10 blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[250px] rounded-full bg-accent/8 blur-[100px]" />
      </div>

      <div className="container mx-auto px-4 py-16 md:py-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-8 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-5">
              <img src={flowersImg} alt="" className="w-10 h-10 rounded-full object-cover ring-2 ring-white/15" />
              <span className="font-serif-display text-2xl font-bold text-white/90">C & R</span>
            </div>
            <p className="font-sans-elegant text-sm leading-relaxed mb-5 opacity-70">
              {t('hero.tagline')}. {t('hero.date')}.
            </p>
            <div className="flex gap-2.5">
              {[Instagram, Mail, MapPin].map((Icon, i) => (
                <a key={i} href="#" className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all duration-300 hover:scale-110 border border-white/10">
                  <Icon className="w-4 h-4 text-white/80" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-sans-elegant text-sm font-bold tracking-[0.15em] uppercase mb-5 text-white/90">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map(link => (
                <li key={link.to}>
                  <Link to={link.to} className="font-sans-elegant text-sm opacity-65 hover:opacity-100 hover:text-white transition-all duration-300">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* More */}
          <div>
            <h4 className="font-sans-elegant text-sm font-bold tracking-[0.15em] uppercase mb-5 text-white/90">
              More
            </h4>
            <ul className="space-y-3">
              {moreLinks.map(link => (
                <li key={link.to}>
                  <Link to={link.to} className="font-sans-elegant text-sm opacity-65 hover:opacity-100 hover:text-white transition-all duration-300">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Venue */}
          <div>
            <h4 className="font-sans-elegant text-sm font-bold tracking-[0.15em] uppercase mb-5 text-white/90">
              Venue
            </h4>
            <p className="font-sans-elegant text-sm opacity-65 leading-relaxed mb-2">
              {t('details.ceremony.location')}
            </p>
            <p className="font-sans-elegant text-sm opacity-65 leading-relaxed mb-4">
              {t('details.ceremony.address')}
            </p>
            <p className="font-sans-elegant text-xs font-semibold text-rose/80">15 Août 2027 • 14:00</p>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs opacity-50 flex items-center gap-1.5 font-sans-elegant">
            {t('footer.made')} <Heart className="w-3 h-3 text-rose fill-rose" /> {t('footer.copyright')}
          </p>
          <p className="font-serif-display text-lg font-bold text-white/80">Corine & Ruben</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
