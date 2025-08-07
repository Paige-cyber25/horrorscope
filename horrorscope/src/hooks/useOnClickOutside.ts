// hooks/useOnClickOutside.ts
"use client";

import { useEffect, RefObject } from 'react';

const useOnClickOutside = <T extends Element | null, E extends Element | null>(
  ref: RefObject<T>,
  handler: (event: MouseEvent | TouchEvent) => void,
  exceptionRef?: RefObject<E>
) => {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      // Do nothing if clicking the ref's element or descendant elements
      // or if clicking the exceptionRef's element or descendant elements.
      if (
        !ref.current ||
        ref.current.contains(event.target as Node) ||
        (exceptionRef?.current && exceptionRef.current.contains(event.target as Node))
      ) {
        return;
      }

      const targetElement = event.target as Element;
      if (targetElement.closest && targetElement.closest('#modalRoot')) {
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
  }, [ref, handler, exceptionRef]); // Include exceptionRef directly
};

export default useOnClickOutside;