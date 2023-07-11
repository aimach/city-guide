import "./App.scss";
import Header from "./components/common/header/Header";
import InteractiveMap from "./components/interactiveMap/InteractiveMap";

function App() {
  return (
    <div className="App">
      <Header />
      <div>
        <InteractiveMap />
      </div>
    </div>
  );
}

export default App;
