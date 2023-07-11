import "./App.scss";
import InteractiveMap from "./components/interactiveMap/InteractiveMap";
import './App.scss';
import { createBrowserRouter,createRoutesFromElements, Outlet, Route, RouterProvider } from 'react-router-dom';
import Register from './pages/Register/Register';
import Login from './pages/Login/Login';
import HomePage from './pages/HomePage/HomePage';
import { UserProvider } from './contexts/UserContext';
 
const Root = () => {
  return (
    <UserProvider>
      <Outlet /> {/* Outlet is where the child routes will be rendered */}
    </UserProvider>
  )
}

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
    <Route path='/' element={<Root/>}>
      <Route index element={<HomePage/>}/>
      <Route path="/login"index element={<Login/>}/>
      <Route path="/register"index element={<Register/>}/>
    </Route>
    )
  )

 
  return (
    <>
    <div className="App">
      <header className="App-header">
        <h1>City Guide</h1>
      </header>
      <div>
        <InteractiveMap />
      </div>
    </div>
    <RouterProvider router={router}/>
    </>
  );



}

export default App;
