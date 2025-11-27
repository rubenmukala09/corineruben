// Professional easing functions for smooth scroll animations
export const easeInOutCubic = (t: number): number => {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
};

export const easeInOutQuad = (t: number): number => {
  return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
};

// More responsive easing for natural scrolling feel
export const easeOutQuart = (t: number): number => {
  return 1 - Math.pow(1 - t, 4);
};

// Custom smooth scroll with professional easing and hardware acceleration
export const smoothScrollTo = (
  target: number, 
  duration: number = 600,
  easingFunction: (t: number) => number = easeOutQuart
): Promise<void> => {
  return new Promise((resolve) => {
    const start = window.pageYOffset;
    const distance = target - start;
    let startTime: number | null = null;

    // If distance is very small, skip animation
    if (Math.abs(distance) < 1) {
      window.scrollTo(0, target);
      resolve();
      return;
    }

    const animation = (currentTime: number) => {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);
      const ease = easingFunction(progress);

      window.scrollTo(0, start + distance * ease);

      if (progress < 1) {
        requestAnimationFrame(animation);
      } else {
        resolve();
      }
    };

    requestAnimationFrame(animation);
  });
};

// Scroll to element with offset
export const smoothScrollToElement = (
  element: Element,
  offset: number = 80,
  duration: number = 600
): Promise<void> => {
  const elementPosition = element.getBoundingClientRect().top;
  const offsetPosition = elementPosition + window.pageYOffset - offset;
  return smoothScrollTo(offsetPosition, duration);
};

// Instant scroll to top (for route changes)
export const instantScrollToTop = (): void => {
  window.scrollTo(0, 0);
};
