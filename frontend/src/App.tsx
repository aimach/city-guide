import "./App.scss";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Outlet,
  Route,
  RouterProvider,
} from "react-router-dom";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import HomePage from "./pages/HomePage/HomePage";
import { UserProvider } from "./contexts/UserContext";
import * as React from "react";
import Contribution from "./pages/Contribution/Contribution";
import InteractiveMap from "./components/interactiveMap/InteractiveMap";
import PoiListView from "./pages/PoiListView/PoiListView";
import Layout from "./components/layout/Layout";
import FaqPage from "./pages/Faq/FaqPage";
import ContactPage from "./pages/Contact/ContactPage";
import ProfileFavorite from "./pages/Profile/ProfileFavorites";
import ProfileMenuMobile from "./pages/Profile/ProfileMenuMobile";
import Profile from "./pages/Profile/Profile";

const Root = () => {
  return (
    <UserProvider>
      <Layout>
        <Outlet /> {/* Outlet is where the child routes will be rendered */}
      </Layout>
    </UserProvider>
  );
};

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Root />}>
        <Route index element={<HomePage />} />
        <Route path="/auth">
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
        <Route path="/profile">
          <Route path="page" element={<Profile />} />
          <Route path="menu" element={<ProfileMenuMobile />} />
          <Route path="favorites" element={<ProfileFavorite />} />
        </Route>
        <Route path="/contribution" element={<Contribution />} />
        <Route path="poi">
          <Route path=":cityId" index element={<PoiListView />} />
        </Route>
        <Route path="/map" element={<InteractiveMap />} />
        <Route>
          <Route path="/faq" element={<FaqPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Route>
      </Route>
    )
  );

  return (
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
}

export default App;
