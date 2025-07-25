"use client"

import { useEffect } from 'react';

const useOnClickOutside = <T extends HTMLElement | null>(
  ref: React.RefObject<T>, 
  handler: (event: MouseEvent | TouchEvent) => void
) => {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      // Check if event.target is an Element before using closest
      const targetElement = event.target as Element;

      if (targetElement.closest && targetElement.closest('#modalRoot')) {
        return;
      }

      // Do nothing if clicking ref's element or descendant elements
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }

      handler(event);
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]);
};

export default useOnClickOutside;
