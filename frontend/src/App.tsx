import "./App.scss";
import Header from "./components/common/header/Header";
import Footer from "./components/common/footer/Footer";
import HomePage from "./pages/HomePage/HomePage";
import InteractiveMap from "./components/interactiveMap/InteractiveMap";
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
      <header className="App-header">
        <h1>City Guide</h1>
      </header>
      <HomePage />
      <Footer />
      {/* <About /> */}
    </div>
  );
}

export default App;
