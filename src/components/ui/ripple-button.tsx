import { useState, useRef, forwardRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

interface RippleButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'primary' | 'ghost' | 'glass';
  children: React.ReactNode;
  rippleColor?: string;
}

interface Ripple {
  x: number;
  y: number;
  id: number;
}

export const RippleButton = forwardRef<HTMLButtonElement, RippleButtonProps>(
  ({ variant = 'default', children, onClick, className, rippleColor, ...props }, ref) => {
    const [ripples, setRipples] = useState<Ripple[]>([]);
    const btnRef = useRef<HTMLButtonElement>(null);

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      const btn = btnRef.current;
      if (btn) {
        const rect = btn.getBoundingClientRect();
        const ripple: Ripple = {
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
          id: Date.now()
        };
        setRipples(prev => [...prev, ripple]);
        setTimeout(() => {
          setRipples(prev => prev.filter(r => r.id !== ripple.id));
        }, 600);
      }
      onClick?.(e);
    };

    const variantStyles = {
      default: 'bg-primary text-primary-foreground hover:bg-primary/90',
      primary: 'bg-gradient-to-r from-coral-500 to-lavender-500 text-white hover:shadow-lg',
      ghost: 'bg-transparent hover:bg-muted/50',
      glass: 'glass-enhanced shadow-float hover:shadow-2xl'
    };

    return (
      <button
        ref={(node) => {
          // @ts-ignore
          btnRef.current = node;
          if (typeof ref === 'function') ref(node);
          else if (ref) ref.current = node;
        }}
        onClick={handleClick}
        className={cn(
          'relative overflow-hidden px-6 py-3 rounded-full font-semibold transition-all duration-300 active:scale-95',
          variantStyles[variant],
          className
        )}
        {...props}
      >
        <AnimatePresence>
          {ripples.map(ripple => (
            <motion.span
              key={ripple.id}
              className="absolute rounded-full pointer-events-none"
              style={{
                left: ripple.x - 10,
                top: ripple.y - 10,
                width: 20,
                height: 20,
                backgroundColor: rippleColor || 'rgba(255, 255, 255, 0.5)',
              }}
              initial={{ scale: 0, opacity: 1 }}
              animate={{ scale: 40, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            />
          ))}
        </AnimatePresence>
        <span className="relative z-10">{children}</span>
      </button>
    );
  }
);

RippleButton.displayName = 'RippleButton';
