import { useLocation, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Home, ArrowLeft, Heart, MapPin, Calendar, Mail } from "lucide-react";

const NotFound = () => {
  const location = useLocation();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const quickLinks = [
    { icon: Home, label: "Home", path: "/", desc: "Back to the beginning" },
    { icon: Heart, label: "Our Story", path: "/story", desc: "How we met" },
    { icon: Calendar, label: "RSVP", path: "/rsvp", desc: "Confirm attendance" },
    { icon: MapPin, label: "Details", path: "/details", desc: "Venue & schedule" },
  ];

  return (
    <div className="relative min-h-screen overflow-hidden gradient-hero flex items-center justify-center px-4 py-24">
      {/* Floating blobs */}
      <div
        className="floating-blob w-[500px] h-[500px] bg-primary/20 top-[-10%] left-[-5%]"
        style={{ transform: `translate(${mousePos.x * 30}px, ${mousePos.y * 20}px)` }}
      />
      <div
        className="floating-blob w-[400px] h-[400px] bg-accent/25 bottom-[-10%] right-[-5%]"
        style={{ transform: `translate(${-mousePos.x * 20}px, ${-mousePos.y * 15}px)` }}
      />
      <div
        className="floating-blob w-[300px] h-[300px] bg-rose/15 top-[40%] right-[20%]"
        style={{ transform: `translate(${mousePos.x * 15}px, ${-mousePos.y * 25}px)` }}
      />

      <div className="relative z-10 w-full max-w-4xl mx-auto">
        {/* Main glass card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="glass-card-strong rounded-3xl p-8 md:p-14 text-center mb-8"
        >
          {/* Decorative hearts */}
          <motion.div
            animate={{ y: [-8, 8, -8], rotate: [0, 5, -5, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="flex items-center justify-center gap-3 mb-6"
          >
            <Heart className="w-5 h-5 text-primary/40" />
            <Heart className="w-7 h-7 text-primary/60 fill-primary/20" />
            <Heart className="w-5 h-5 text-primary/40" />
          </motion.div>

          {/* 404 number */}
          <motion.h1
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="font-serif-display text-8xl md:text-9xl font-bold gradient-text mb-4 leading-none"
          >
            404
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <h2 className="font-serif-display text-2xl md:text-3xl text-foreground mb-3">
              Page Not Found
            </h2>
            <p className="font-serif-body text-lg md:text-xl text-muted-foreground max-w-md mx-auto mb-2">
              It seems this page wandered off before the celebration.
            </p>
            <p className="font-sans-elegant text-sm text-muted-foreground/70 tracking-wide uppercase">
              Requested: <span className="text-primary/80">{location.pathname}</span>
            </p>
          </motion.div>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10"
          >
            <Link
              to="/"
              className="btn-primary px-8 py-3.5 text-sm"
            >
              <Home className="w-4 h-4" />
              Return Home
            </Link>
            <button
              onClick={() => window.history.back()}
              className="btn-outline px-8 py-3.5 text-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              Go Back
            </button>
          </motion.div>
        </motion.div>

        {/* Quick links grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {quickLinks.map((link, i) => (
            <motion.div
              key={link.path}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 + i * 0.1 }}
              whileHover={{ y: -4, scale: 1.02 }}
            >
              <Link
                to={link.path}
                className="glass-card rounded-2xl p-5 flex flex-col items-center text-center gap-2 hover:shadow-glow transition-all duration-500 group block"
              >
                <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                  <link.icon className="w-5 h-5 text-primary" />
                </div>
                <span className="font-sans-elegant text-sm font-semibold text-foreground tracking-wide">
                  {link.label}
                </span>
                <span className="font-serif-body text-xs text-muted-foreground">
                  {link.desc}
                </span>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Contact widget */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3 }}
          className="mt-8 glass-card rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-accent/30 flex items-center justify-center">
              <Mail className="w-4 h-4 text-primary" />
            </div>
            <div>
              <p className="font-sans-elegant text-sm font-medium text-foreground">Need help?</p>
              <p className="font-serif-body text-xs text-muted-foreground">Reach out to the couple</p>
            </div>
          </div>
          <Link
            to="/rsvp"
            className="font-sans-elegant text-xs font-semibold tracking-wider uppercase text-primary hover:text-primary/80 transition-colors"
          >
            Contact Us →
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;
