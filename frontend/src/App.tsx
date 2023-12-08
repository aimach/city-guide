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
import Layout from "./components/layout/Layout";
import FaqPage from "./pages/Faq/FaqPage";
import Profile from "./pages/Profile/Profile";
import PoiListView from "./pages/PoiListView/PoiListView";
import ProfileMenuMobile from "./pages/Profile/ProfileMenuMobile";
import ProfileFavorite from "./pages/Profile/ProfileFavorites";
import ContactPage from "./pages/Contact/ContactPage";
import BackOfficeHomePage from "./backOffice/pages/HomePage/BackOfficeHomePage";
import Admin from "./backOffice/pages/administrator/Admin/Admin";
import Categories from "./backOffice/pages/administrator/Categories/Categories";
import Cities from "./backOffice/pages/administrator/Cities/Cities";
import Message from "./backOffice/pages/administrator/Message/Message";
import Poi from "./backOffice/pages/administrator/Poi/Poi";
import Profil from "./backOffice/pages/administrator/Profil/Profil";
import Users from "./backOffice/pages/administrator/Users/Users";
import PoiCitiesAdmin from "./backOffice/pages/cities administrator/Poi/PoiCitiesAdmin";
import UsersCitiesAdmin from "./backOffice/pages/cities administrator/Users/UsersCitiesAdmin";
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
        <Route>
          <Route path="/faq" element={<FaqPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Route>

        <Route path="/dashboard" element={<BackOfficeHomePage />} />
        <Route path="/dashboard">
          <Route path="cities" element={<Cities />} />
          <Route path="message" element={<Message />} />
          <Route path="admin" element={<Admin />} />
          <Route path="profil" element={<Profil />} />
          <Route path="categories" element={<Categories />} />
          <Route path="poi" element={<Poi />} />
          <Route path="users" element={<Users />} />
          <Route path="adminCityPoi" element={<PoiCitiesAdmin />} />
          <Route path="adminCityUsers" element={<UsersCitiesAdmin />} />
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
