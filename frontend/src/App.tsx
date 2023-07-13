import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.scss';
import Footer from './component/common/footer/Footer';
import InteractiveMap from './component/interactiveMap/InteractiveMap';
import HomePage from './pages/HomePage/HomePage';
import Layout from './component/layout/Layout';

import Header from './component/common/header/Header';
import PoiListView from './pages/PoiListView/PoiListView';
// import About from "./pages/About/About";

function App() {
   return (
      <BrowserRouter>
         <Header />
         <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="poi">
               <Route path=":cityId" element={<PoiListView />} />
            </Route>
         </Routes>
         <Footer />
         {/* <About /> */}
      </BrowserRouter>
   );
}
export default App;
