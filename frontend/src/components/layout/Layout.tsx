import React, { PropsWithChildren, useEffect, useState } from "react";
import { useLocation } from "react-router";
import Header from "../common/header/Header";
import Footer from "../common/footer/Footer";
import useWindowDimensions from "../../utils/hooks/useWindowDimensions";

const Layout = ({ children }: PropsWithChildren) => {
  const windowSize = useWindowDimensions();
  let location = useLocation();
  const isAuthPage =
    (location.pathname.includes("register") && windowSize > 768) ||
    (location.pathname.includes("login") && windowSize > 768);

  return (
    <>
      {isAuthPage ? null : (
        <Header size={windowSize > 768 ? "desktop" : "mobile"} />
      )}
      {children}
      {isAuthPage ? null : windowSize > 768 ? <Footer /> : null}
    </>
  );
};

export default Layout;
