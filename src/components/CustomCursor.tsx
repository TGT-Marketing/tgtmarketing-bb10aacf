import { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

const CustomCursor = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const cursorX = useSpring(0, { damping: 25, stiffness: 500 });
  const cursorY = useSpring(0, { damping: 25, stiffness: 500 });

  const dotX = useSpring(0, { damping: 20, stiffness: 800 });
  const dotY = useSpring(0, { damping: 20, stiffness: 800 });

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
      dotX.set(e.clientX - 2);
      dotY.set(e.clientY - 2);
      
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive = 
        target.closest('button') || 
        target.closest('a') || 
        target.closest('[role="button"]') ||
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA';
        
      setIsHovering(!!isInteractive);
    };

    const handleMouseOut = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseleave', handleMouseOut);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseleave', handleMouseOut);
    };
  }, [cursorX, cursorY, dotX, dotY, isVisible]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] hidden md:block">
      <motion.div
        className="w-8 h-8 rounded-full border border-accent/50 mix-blend-difference"
        style={{
          x: cursorX,
          y: cursorY,
          scale: isHovering ? 2 : 1,
          backgroundColor: isHovering ? 'hsl(0 78% 48% / 0.1)' : 'transparent',
        }}
        transition={{ type: 'spring', damping: 30, stiffness: 200 }}
      />
      <motion.div
        className="w-1 h-1 rounded-full bg-accent absolute top-0 left-0"
        style={{
          x: dotX,
          y: dotY,
        }}
      />
    </div>
  );
};

export default CustomCursor;
