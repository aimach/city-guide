import "./App.scss";
import InteractiveMap from "./components/interactiveMap/InteractiveMap";
import Footer from "./components/common/footer/Footer";
import SearchPOI from "./pages/SearchPOI/SearchPOI";
import "./Reset.scss";
import Header from "./components/common/header/Header";
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
			<div>
				<InteractiveMap />
				<SearchPOI />
			</div>
			<Footer />
			{/* <About /> */}
		</div>
	);
}

export default App;
