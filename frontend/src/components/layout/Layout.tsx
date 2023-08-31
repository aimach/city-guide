import React, { PropsWithChildren, useEffect, useState } from 'react';
import Header from '../common/header/Header';
import Footer from '../common/footer/Footer';
import { UserProvider } from '../../contexts/UserContext';

const Layout = ({ children }: PropsWithChildren) => {
   const [windowSize, setWindowSize] = useState<number>(window.innerWidth);

   function updateDimension() {
      setWindowSize(window.innerWidth);
   }

   useEffect(() => {
      window.addEventListener('resize', updateDimension);
   }, [windowSize]);
   return (
      <>
         <UserProvider>
            <Header size={windowSize > 768 ? 'desktop' : 'mobile'} />
            {children}
            <Footer />
         </UserProvider>
      </>
   );
};

export default Layout;
