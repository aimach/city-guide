import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.scss';
import Footer from './component/common/footer/Footer';
import InteractiveMap from './component/interactiveMap/InteractiveMap';
import HomePage from './pages/HomePage/HomePage';
import Layout from './components/layout/Layout';
import ResultPoi from './pages/ResultPoi/ResultPoi';
// import About from "./pages/About/About";

function App() {
   return (
      <BrowserRouter>
         <Layout>
            <Routes>
               <Route path="/" element={<HomePage />} />
               <Route path="poi">
                  <Route path=":cityId" element={<ResultPoi />} />
               </Route>
            </Routes>
         </Layout>
         <Footer />
         {/* <About /> */}
      </BrowserRouter>
   );
}
export default App;
