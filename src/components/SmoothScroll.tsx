import { useEffect } from 'react';
import Lenis from 'lenis';

const SmoothScroll = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Watch for modal open (Radix)
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'data-radix-scroll-lock') {
          const isLocked = document.body.hasAttribute('data-radix-scroll-lock');
          if (isLocked) {
            lenis.stop();
          } else {
            lenis.start();
          }
        }
      });
    });

    observer.observe(document.body, { attributes: true });

    return () => {
      lenis.destroy();
      observer.disconnect();
    };
  }, []);

  return <>{children}</>;
};

export default SmoothScroll;
