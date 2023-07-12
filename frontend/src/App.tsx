import "./App.scss";
import Footer from "./components/common/footer/Footer";
import HomePage from "./pages/HomePage/HomePage";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>City Guide</h1>
      </header>
      <HomePage />
      <Footer />
    </div>
  );
}
export default App;
