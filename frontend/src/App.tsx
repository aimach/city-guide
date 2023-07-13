import "./App.scss";
import Footer from "./component/common/footer/Footer";
import InteractiveMap from "./component/interactiveMap/InteractiveMap";
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
			<Footer />
			{/* <About /> */}
		</div>
	);
}
export default App;
