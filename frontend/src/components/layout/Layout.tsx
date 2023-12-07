import { PropsWithChildren, useEffect, useState } from "react";
import Header from "../common/header/Header";
import Footer from "../common/footer/Footer";

const Layout = ({ children }: PropsWithChildren) => {
  const [windowSize, setWindowSize] = useState<number>(window.innerWidth);

  function updateDimension() {
    setWindowSize(window.innerWidth);
  }

  useEffect(() => {
    window.addEventListener("resize", updateDimension);
  }, [windowSize]);
  return (
    <>
      <Header size={windowSize > 768 ? "desktop" : "mobile"} />
      {children}
      {windowSize > 768 ? <Footer /> : null}
    </>
  );
};

export default Layout;
