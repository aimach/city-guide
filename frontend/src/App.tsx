import "./App.scss";
import Header from "./components/common/header/Header";
import Footer from "./components/common/footer/Footer";
import InteractiveMap from "./components/interactiveMap/InteractiveMap";

function App() {
  return (
    <div className="App">
      <Header />
      <div>
        <InteractiveMap />
      </div>
      <Footer />
    </div>
  );
}
export default App;
