import './App.scss';
import InteractiveMap from './components/interactiveMap/InteractiveMap';
import HomePage from './pages/HomePage/HomePage';

function App() {
   return (
      <div className="App">
         <header className="App-header">
            <h1>City Guide</h1>
         </header>
         <div>
            <HomePage />
         </div>
      </div>
   );
}

export default App;
