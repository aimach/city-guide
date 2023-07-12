import "./App.scss";
import HeaderDesktop from "./components/common/header/HeaderDesktop";
import Footer from "./components/common/footer/Footer";
import InteractiveMap from "./components/interactiveMap/InteractiveMap";
import { useEffect, useState } from "react";
import HeaderMobile from "./components/common/header/HeaderMobile";

function App() {
  // get window size to display header
  const [windowSize, setWindowSize] = useState<number>(window.innerWidth);

  function updateDimension() {
    setWindowSize(window.innerWidth);
  }

  useEffect(() => {
    window.addEventListener("resize", updateDimension);
  }, []);

  return (
    <div className="App">
      {windowSize > 768 && <HeaderDesktop />}
      <div>
        <InteractiveMap />
      </div>
      {windowSize < 768 && <HeaderMobile />}
      {/* <Footer /> */}
    </div>
  );
}
export default App;
