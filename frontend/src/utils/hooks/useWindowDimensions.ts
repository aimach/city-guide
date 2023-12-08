import { useEffect, useState } from 'react';

function useWindowDimensions() {
   const [windowSize, setWindowSize] = useState<number>(window.innerWidth);

   function updateDimension() {
      setWindowSize(window.innerWidth);
   }
   useEffect(() => {
      window.addEventListener('resize', updateDimension);
   }, []);

   return windowSize;
}

export default useWindowDimensions;
