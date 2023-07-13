import "./App.scss";
import Header from "./components/common/header/Header";
import Footer from "./components/common/footer/Footer";
import HomePage from "./pages/HomePage/HomePage";
// import About from "./pages/About/About";
import { useEffect, useState } from "react";

function App() {
  // get window size to display header
  const [windowSize, setWindowSize] = useState<number>(window.innerWidth);

  function updateDimension() {
    setWindowSize(window.innerWidth);
  }

  useEffect(() => {
    window.addEventListener("resize", updateDimension);
  }, [windowSize]);

  return (
    <div className="App">
      <Header size={windowSize > 768 ? "desktop" : "mobile"} />
      <HomePage />
      <Footer />
      {/* <About /> */}
    </div>
  );
}

export default App;
