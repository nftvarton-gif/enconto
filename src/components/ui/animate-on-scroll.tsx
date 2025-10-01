'use client';

import { useRef, useEffect, useState, type ReactNode, type HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface AnimateOnScrollProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  animation?: 'fade-in' | 'fade-in-up';
  delay?: number; // in ms
  threshold?: number;
  triggerOnce?: boolean;
}

export function AnimateOnScroll({ 
  children, 
  className, 
  animation = 'fade-in-up',
  delay = 0,
  threshold = 0.1,
  triggerOnce = true,
   ...props 
}: AnimateOnScrollProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (triggerOnce) {
            observer.unobserve(element);
          }
        } else if (!triggerOnce) {
            setIsVisible(false);
        }
      },
      {
        rootMargin: '0px',
        threshold,
      }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [threshold, triggerOnce]);

  const animationClasses = {
    'fade-in': 'animate-fade-in',
    'fade-in-up': 'animate-fade-in-up',
  };

  return (
    <div
      ref={ref}
      className={cn(
        'transition-opacity duration-700 ease-out',
        isVisible ? 'opacity-100' : 'opacity-0',
        isVisible && animationClasses[animation],
        className
      )}
      style={{
        animationDelay: isVisible ? `${delay}ms` : undefined,
        animationFillMode: 'both',
      }}
      {...props}
    >
      {children}
    </div>
  );
}
