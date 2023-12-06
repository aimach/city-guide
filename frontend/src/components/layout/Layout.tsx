import React, { PropsWithChildren, useEffect, useState } from "react";
import { useLocation } from "react-router";
import Header from "../common/header/Header";
import Footer from "../common/footer/Footer";

const Layout = ({ children }: PropsWithChildren) => {
  const [windowSize, setWindowSize] = useState<number>(window.innerWidth);
  let location = useLocation();
  const isAuthPage =
    location.pathname.includes("register") ||
    location.pathname.includes("login");

  function updateDimension() {
    setWindowSize(window.innerWidth);
  }

  useEffect(() => {
    window.addEventListener("resize", updateDimension);
  }, [windowSize]);
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
