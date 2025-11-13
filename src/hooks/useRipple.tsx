import { useEffect, useRef } from 'react';

export const useRipple = () => {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const createRipple = (event: MouseEvent) => {
      const button = event.currentTarget as HTMLElement;
      const ripple = document.createElement('span');
      ripple.classList.add('ripple');

      // Calculate position relative to button
      const rect = button.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      // Calculate size (diameter should be the larger dimension)
      const size = Math.max(rect.width, rect.height);

      ripple.style.width = `${size}px`;
      ripple.style.height = `${size}px`;
      ripple.style.left = `${x - size / 2}px`;
      ripple.style.top = `${y - size / 2}px`;

      button.appendChild(ripple);

      // Remove ripple after animation
      setTimeout(() => {
        ripple.remove();
      }, 600);
    };

    element.addEventListener('click', createRipple as EventListener);

    return () => {
      element.removeEventListener('click', createRipple as EventListener);
    };
  }, []);

  return ref;
};
