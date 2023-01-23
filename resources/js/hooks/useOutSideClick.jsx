import { useEffect, useRef } from "react";

const useOutsideClick = (callback) => {
  const ref = useRef([]);
  
  useEffect(() => {
    const handleClick = (event) => {
      if (ref.current) {
        let notContainCount = 0
        ref.current.forEach(item => {
          if (item && !item.contains(event.target)) {
            notContainCount++;
          }
        });

        if (notContainCount === ref.current.length) {
          callback();
        }
      }
    };

    document.addEventListener('click', handleClick, true);

    return () => {
      document.removeEventListener('click', handleClick, true);
    };
  }, [ref]);

  return ref;
};

export default useOutsideClick;
