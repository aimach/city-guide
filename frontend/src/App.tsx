import "./App.scss";
import InteractiveMap from "./components/interactiveMap/InteractiveMap";
import Footer from "./components/common/footer/Footer";
import SearchPOI from "./pages/SearchPOI/SearchPOI";
import "./Reset.scss";
// import About from "./pages/About/About";

function App() {
	return (
		<div className="App">
			<header className="App-header">
				<h1>City Guide</h1>
			</header>
			<div>
				<InteractiveMap />
			</div>
			<SearchPOI />
			<Footer />
			{/* <About /> */}
		</div>
	);
}
export default App;
