import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.scss';
import InteractiveMap from './components/interactiveMap/InteractiveMap';
import HomePage from './pages/HomePage/HomePage';
import Layout from './components/layout/Layout';
import ResultPoi from './pages/ResultPoi/ResultPoi';

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
      </BrowserRouter>
   );
}

export default App;
