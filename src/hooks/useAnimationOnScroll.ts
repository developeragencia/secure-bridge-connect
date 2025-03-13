
import { useRef, useState, useEffect } from 'react';
import { useIntersectionObserver } from './useIntersectionObserver';

export type TransitionType = 
  | 'fade-in' 
  | 'fade-up' 
  | 'fade-down' 
  | 'slide-in-right' 
  | 'slide-in-left'
  | 'zoom-in'
  | 'fade-in-right'  // Added for Hero component
  | 'fade-in-left';  // Added for MethodologyCard component

interface AnimationOptions<T> {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
  transitionType?: TransitionType;
  delay?: number;
  duration?: number;
}

export function useAnimationOnScroll<T extends HTMLElement>(
  options: AnimationOptions<T> = {}
) {
  const {
    threshold = 0.1,
    rootMargin = '0px',
    triggerOnce = true,
    transitionType = 'fade-in',
    delay = 0,
    duration = 300,
  } = options;

  const ref = useRef<T>(null);
  const [isVisible, setIsVisible] = useState(false);

  const onIntersect = (entries: IntersectionObserverEntry[]) => {
    const [entry] = entries;
    if (entry.isIntersecting) {
      setIsVisible(true);
      if (triggerOnce && ref.current) {
        observer.unobserve(ref.current);
      }
    } else if (!triggerOnce) {
      setIsVisible(false);
    }
  };

  const { observer } = useIntersectionObserver({
    onIntersect,
    threshold,
    rootMargin,
  });

  useEffect(() => {
    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [observer]);

  // Generate class names based on animation type
  const getTransitionClasses = () => {
    const baseClasses = 'transition-all duration-500 ease-in-out';
    const delayClass = delay > 0 ? `delay-[${delay}ms]` : '';
    const durationClass = `duration-[${duration}ms]`;

    const animationClasses = {
      'fade-in': `${isVisible ? 'opacity-100' : 'opacity-0'}`,
      'fade-up': `${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`,
      'fade-down': `${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`,
      'slide-in-right': `${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'}`,
      'slide-in-left': `${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'}`,
      'zoom-in': `${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`,
      'fade-in-right': `${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`,
      'fade-in-left': `${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`
    };

    return `${baseClasses} ${delayClass} ${durationClass} ${animationClasses[transitionType]}`;
  };

  return {
    ref,
    isVisible,
    classes: getTransitionClasses(),
  };
}
