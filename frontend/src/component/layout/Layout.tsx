import React, { PropsWithChildren } from 'react';
import Header from '../common/header/Header';
import Footer from '../common/footer/Footer';

const Layout = ({ children }: PropsWithChildren) => {
   return (
      <>
         <Header />
         {children}
         <Footer />
      </>
   );
};

export default Layout;
