import confetti from "canvas-confetti";

interface ConfettiOptions {
  particleCount?: number;
  spread?: number;
  origin?: { x: number; y: number };
}

export const useConfetti = () => {
  const fireConfetti = (options: ConfettiOptions = {}) => {
    const defaults = {
      particleCount: 100,
      spread: 70,
      origin: { x: 0.5, y: 0.6 },
      colors: ['#E91E63', '#9C27B0', '#673AB7', '#3F51B5', '#2196F3'],
    };

    confetti({
      ...defaults,
      ...options,
    });
  };

  const fireCelebration = () => {
    // Fire multiple bursts for a bigger celebration
    const count = 200;
    const defaults = {
      origin: { y: 0.7 },
      colors: ['#E91E63', '#9C27B0', '#673AB7', '#FFD700', '#00E676'],
    };

    function fire(particleRatio: number, opts: confetti.Options) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio),
      });
    }

    fire(0.25, { spread: 26, startVelocity: 55 });
    fire(0.2, { spread: 60 });
    fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
    fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
    fire(0.1, { spread: 120, startVelocity: 45 });
  };

  const fireSuccess = () => {
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.65 },
      colors: ['#00E676', '#69F0AE', '#B2FF59', '#CCFF90'],
    });
  };

  const fireSideCanons = () => {
    const end = Date.now() + 300;

    const frame = () => {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#E91E63', '#9C27B0', '#673AB7'],
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#E91E63', '#9C27B0', '#673AB7'],
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };

    frame();
  };

  return {
    fireConfetti,
    fireCelebration,
    fireSuccess,
    fireSideCanons,
  };
};

export default useConfetti;
