
import { useState, useEffect, useRef } from "react";

interface AnimatedCounterProps {
  end: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
  decimals?: number;
}

const AnimatedCounter = ({
  end,
  duration = 2000,
  prefix = "",
  suffix = "",
  className = "",
  decimals = 0
}: AnimatedCounterProps) => {
  const [count, setCount] = useState(0);
  const countRef = useRef(0);
  const timerRef = useRef<number | null>(null);
  
  useEffect(() => {
    const startTime = Date.now();
    const step = () => {
      const now = Date.now();
      const progress = Math.min((now - startTime) / duration, 1);
      
      countRef.current = progress * end;
      setCount(countRef.current);
      
      if (progress < 1) {
        timerRef.current = requestAnimationFrame(step);
      }
    };
    
    timerRef.current = requestAnimationFrame(step);
    
    return () => {
      if (timerRef.current !== null) {
        cancelAnimationFrame(timerRef.current);
      }
    };
  }, [end, duration]);
  
  return (
    <span className={`animate-counter ${className}`}>
      {prefix}
      {count.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
      {suffix}
    </span>
  );
};

export default AnimatedCounter;
