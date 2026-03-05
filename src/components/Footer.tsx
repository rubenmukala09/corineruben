import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Heart, Instagram, Mail, MapPin } from 'lucide-react';

const Footer = () => {
  const { t } = useLanguage();

  const companyLinks = [
    { label: t('nav.home'), to: '/' },
    { label: t('nav.story'), to: '/story' },
    { label: t('nav.details'), to: '/details' },
  ];

  const inspirationLinks = [
    { label: t('nav.rsvp'), to: '/rsvp' },
    { label: t('nav.gallery'), to: '/gallery' },
    { label: t('nav.registry'), to: '/registry' },
  ];

  return (
    <footer className="footer-dark relative overflow-hidden">
      {/* Subtle decorative blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[300px] rounded-full bg-white/5 blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[250px] rounded-full bg-white/3 blur-[100px]" />
      </div>

      <div className="container mx-auto px-6 md:px-12 py-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-8 mb-14">
          {/* Brand */}
          <div className="md:col-span-1">
            <span className="font-serif-display text-2xl font-semibold text-white/90 block mb-5">C & R</span>
            <p className="font-sans-elegant text-sm leading-relaxed mb-6 text-white/60">
              {t('hero.tagline')}. {t('hero.date')}.
            </p>
            <div className="flex gap-3">
              {[Instagram, Mail, MapPin].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all duration-300 hover:scale-110 border border-white/10">
                  <Icon className="w-4 h-4 text-white/70" />
                </a>
              ))}
            </div>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-sans-elegant text-xs font-semibold tracking-[0.2em] uppercase mb-5 text-white/80">
              Company
            </h4>
            <ul className="space-y-3">
              {companyLinks.map(link => (
                <li key={link.to}>
                  <Link to={link.to} className="font-sans-elegant text-sm text-white/55 hover:text-white transition-all duration-300">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Inspiration */}
          <div>
            <h4 className="font-sans-elegant text-xs font-semibold tracking-[0.2em] uppercase mb-5 text-white/80">
              Inspiration
            </h4>
            <ul className="space-y-3">
              {inspirationLinks.map(link => (
                <li key={link.to}>
                  <Link to={link.to} className="font-sans-elegant text-sm text-white/55 hover:text-white transition-all duration-300">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Venue */}
          <div>
            <h4 className="font-sans-elegant text-xs font-semibold tracking-[0.2em] uppercase mb-5 text-white/80">
              Venue
            </h4>
            <p className="font-sans-elegant text-sm text-white/55 leading-relaxed mb-2">
              {t('details.ceremony.location')}
            </p>
            <p className="font-sans-elegant text-sm text-white/55 leading-relaxed mb-4">
              {t('details.ceremony.address')}
            </p>
            <p className="font-sans-elegant text-xs font-medium text-dusty-rose">15 Août 2027 • 14:00</p>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/40 flex items-center gap-1.5 font-sans-elegant">
            {t('footer.made')} <Heart className="w-3 h-3 text-dusty-rose fill-dusty-rose" /> {t('footer.copyright')}
          </p>
          <p className="font-serif-display text-lg font-semibold text-white/70">Corine & Ruben</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
