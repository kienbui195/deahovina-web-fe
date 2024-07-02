import { useState, useEffect } from 'react';

const useScrollDirection = () => {
  const [isScrollDown, setIsScrollDown] = useState(false);

  useEffect(() => {
    let lastScrollY = window.pageYOffset;

    const updateScrollDirection = () => {
      const scrollY = window.pageYOffset;
      const isScrollingDown = scrollY > lastScrollY;
      setIsScrollDown(isScrollingDown);
      lastScrollY = scrollY > 0 ? scrollY : 0;
    };

    window.addEventListener('scroll', updateScrollDirection);

    return () => {
      window.removeEventListener('scroll', updateScrollDirection);
    };
  }, []);

  return isScrollDown;
};

export default useScrollDirection;
