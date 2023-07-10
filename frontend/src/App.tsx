import "./App.scss";
import InteractiveMap from "./Components/interactiveMap/InteractiveMap";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>City Guide</h1>
      </header>
      <div>
        <InteractiveMap />
      </div>
    </div>
  );
}

export default App;
