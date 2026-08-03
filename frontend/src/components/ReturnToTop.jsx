import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export const ReturnToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => setIsVisible(window.scrollY > 300);
    toggleVisibility();
    window.addEventListener('scroll', toggleVisibility, { passive: true });
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Return to top"
      title="Back to top"
      aria-hidden={!isVisible}
      tabIndex={isVisible ? 0 : -1}
      className={`group fixed bottom-6 right-6 z-30 rounded-xl bg-brand-gradient p-3 text-white shadow-lg transition-all duration-200 hover:bg-brand-gradient focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 ${
        isVisible ? 'opacity-100' : 'pointer-events-none translate-y-2 opacity-0'
      }`}
    >
      <ArrowUp className="h-5 w-5 transition-transform group-hover:-translate-y-0.5" />
    </button>
  );
};