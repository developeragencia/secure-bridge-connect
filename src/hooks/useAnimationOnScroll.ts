
import { useRef, useState, useEffect } from 'react';

type TransitionType = 'fade-in' | 'slide-up' | 'slide-in-right' | 'zoom-in' | 'fade-in-right' | 'fade-in-left';

interface AnimationOptions {
  threshold?: number;
  delay?: number;
  transitionType?: TransitionType;
}

export const useAnimationOnScroll = <T extends HTMLElement>({
  threshold = 0.2,
  delay = 0,
  transitionType = 'fade-in'
}: AnimationOptions = {}) => {
  const ref = useRef<T>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setTimeout(() => {
            setIsVisible(true);
          }, delay);
          observer.unobserve(element);
        }
      },
      { threshold }
    );

    observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, [threshold, delay]);

  // Define CSS classes based on animation type
  const getAnimationClasses = () => {
    const baseClass = 'transition-all duration-500 ease-out';
    
    const stateClasses = isVisible 
      ? 'opacity-100 translate-y-0 translate-x-0 scale-100' 
      : '';
    
    let initialClasses = '';
    
    switch (transitionType) {
      case 'fade-in':
        initialClasses = !isVisible ? 'opacity-0' : '';
        break;
      case 'slide-up':
        initialClasses = !isVisible ? 'opacity-0 translate-y-10' : '';
        break;
      case 'slide-in-right':
      case 'fade-in-right':
        initialClasses = !isVisible ? 'opacity-0 translate-x-10' : '';
        break;
      case 'fade-in-left':
        initialClasses = !isVisible ? 'opacity-0 translate-x-10' : '';
        break;
      case 'zoom-in':
        initialClasses = !isVisible ? 'opacity-0 scale-95' : '';
        break;
      default:
        initialClasses = !isVisible ? 'opacity-0' : '';
    }
    
    return `${baseClass} ${initialClasses} ${stateClasses}`;
  };

  return {
    ref,
    isVisible,
    classes: getAnimationClasses()
  };
};
