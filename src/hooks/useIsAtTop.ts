import { useState, useEffect } from 'react';

const useIsAtTop = () => {
  const [isAtTop, setIsAtTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.pageYOffset;
      setIsAtTop(scrollY === 0);
    };

    window.addEventListener('scroll', handleScroll);

    // Gọi hàm handleScroll lần đầu để thiết lập giá trị ban đầu
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return isAtTop;
};

export default useIsAtTop;
