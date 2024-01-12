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
import Message from "./backOffice/pages/administrator/Message/Message";
import Admin from "./backOffice/pages/administrator/Admin/Admin";
import Categories from "./backOffice/pages/administrator/Categories/Categories";
import Poi from "./backOffice/pages/administrator/Poi/Poi";
import Users from "./backOffice/pages/administrator/Users/Users";
import PoiCitiesAdmin from "./backOffice/pages/cities administrator/Poi/PoiCitiesAdmin";
import UsersCitiesAdmin from "./backOffice/pages/cities administrator/Users/UsersCitiesAdmin";
import Layout from "./components/layout/Layout";
import PoiListView from "./pages/PoiListView/PoiListView";
import Profile from "./pages/Profile/Profile";
import ProfileMenuMobile from "./pages/Profile/ProfileMenuMobile";
import ProfileFavorite from "./pages/Profile/ProfileFavorites";
import FaqPage from "./pages/Faq/FaqPage";
import ContactPage from "./pages/Contact/ContactPage";
import ScrollToTop from "./components/layout/ScrollToTop";
import ProfilAdmin from "./backOffice/pages/administrator/Profil/ProfilAdmin";
import AdminCity from "./backOffice/pages/cities administrator/AdminCity/AdminCiti";
import ProfilAdminCity from "./backOffice/pages/cities administrator/Profil/ProfilAdminCity";
import ProtectedRoute from "./utils/ProtectedRoute";
import { Role } from "./utils/types";

const Root = () => {
  return (
    <UserProvider>
      <ScrollToTop />
      <Layout>
        <Outlet /> {/* Outlet is where the child routes will be rendered */}
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
          <Route path="/contribution" element={<Contribution />} />
          <Route path="poi">
            <Route path=":cityId" index element={<PoiListView />} />
          </Route>
          <Route path="/map" element={<InteractiveMap />} />
          <Route>
            <Route path="/faq" element={<FaqPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Route>
          <Route path="/dashboard" element={<BackOfficeHomePage />} />
          <Route
            path="/dashboard/admin"
            element={
              <ProtectedRoute allowedRoles={[Role.ADMIN]}>
                <Admin />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/admin/cities"
            element={
              <ProtectedRoute allowedRoles={[Role.ADMIN]}>
                <Cities />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/admin/message"
            element={
              <ProtectedRoute allowedRoles={[Role.ADMIN]}>
                <Message />
              </ProtectedRoute>
            }
          />
          {/* <Route path="admin" element={<Admin />} /> */}
          <Route
            path="/dashboard/admin/profilAdmin"
            element={
              <ProtectedRoute allowedRoles={[Role.ADMIN]}>
                <ProfilAdmin />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/admin/categories"
            element={
              <ProtectedRoute allowedRoles={[Role.ADMIN]}>
                <Categories />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/admin/poi"
            element={
              <ProtectedRoute allowedRoles={[Role.ADMIN]}>
                <Poi />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/admin/users"
            element={
              <ProtectedRoute allowedRoles={[Role.ADMIN]}>
                <Users />
              </ProtectedRoute>
            }
          />

          <Route
            path="/dashboard/adminCity"
            element={
              <ProtectedRoute allowedRoles={[Role.ADMIN_CITY]}>
                <AdminCity />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/adminCity/adminCityPoi"
            element={
              <ProtectedRoute allowedRoles={[Role.ADMIN_CITY]}>
                <PoiCitiesAdmin />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/adminCity/adminCityUsers"
            element={
              <ProtectedRoute allowedRoles={[Role.ADMIN_CITY]}>
                <UsersCitiesAdmin />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/adminCity/profilAdminCity"
            element={
              <ProtectedRoute allowedRoles={[Role.ADMIN_CITY]}>
                <ProfilAdminCity />
              </ProtectedRoute>
            }
          />
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
