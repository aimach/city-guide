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
import { default as BackOfficeHomePage } from "./backOffice/pages/HomePage/BackOfficeHomePage";
import Cities from "./backOffice/pages/administrator/Cities/Cities";
import MessagePage from "./backOffice/pages/administrator/Message/Message";
import Admin from "./backOffice/pages/administrator/Admin/Admin";
import Categories from "./backOffice/pages/administrator/Categories/Categories";
import Layout from "./components/layout/Layout";
import PoiListView from "./pages/PoiListView/PoiListView";
import Profile from "./pages/Profile/Profile";
import ProfileMenuMobile from "./pages/Profile/ProfileMenuMobile";
import ProfileFavorite from "./pages/Profile/ProfileFavorites";
import FaqPage from "./pages/Faq/FaqPage";
import ContactPage from "./pages/Contact/ContactPage";
import ScrollToTop from "./components/layout/ScrollToTop";
import PoiCityAdmin from "./backOffice/pages/cityadministrator/Poi/PoiCityAdmin";
import UsersCitiesAdmin from "./backOffice/pages/cityadministrator/Users/UsersCitiesAdmin";

const Root = () => {
  return (
    <UserProvider>
      <ScrollToTop />
      <Layout>
        <Outlet />
      </Layout>
    </UserProvider>
  );
};

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
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
          <Route path="contribution" element={<Contribution />} />
          <Route path="poi">
            <Route path=":cityId" index element={<PoiListView />} />
          </Route>
          <Route path="/map" element={<InteractiveMap />} />
          <Route>
            <Route path="/faq" element={<FaqPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Route>
          <Route path="/dashboard" element={<BackOfficeHomePage />} />
          <Route path="/dashboard">
            <Route path="cities" element={<Cities />} />
            <Route path="message" element={<MessagePage />} />
            <Route path="admin" element={<Admin />} />
            <Route path="categories" element={<Categories />} />
            <Route path="poi" element={<PoiCityAdmin />} />
            <Route path="admin-city/poi" element={<PoiCityAdmin />} />
            <Route path="admin-city/users" element={<UsersCitiesAdmin />} />
          </Route>
        </Route>

        <Route path="/auth">
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
      </>
    )
  );

  return (
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
}

export default App;
