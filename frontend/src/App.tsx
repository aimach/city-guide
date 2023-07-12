import "./App.scss";
import Footer from "./component/common/footer/Footer";
import InteractiveMap from "./component/interactiveMap/InteractiveMap";

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
		</div>
	);
}
export default App;
