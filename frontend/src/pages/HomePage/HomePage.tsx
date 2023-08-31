// import React, { useContext } from 'react'
import Header from "../../components/common/header/Header";
import { UsersContext, UserProvider } from "../../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import InteractiveMap from "../../components/interactiveMap/InteractiveMap";
import { useContext, useEffect, useState } from "react";
import Footer from "../../components/common/footer/Footer";
import "./homePage.scss";

const HomePage = () => {
  const [windowSize, setWindowSize] = useState<number>(window.innerWidth);

  function updateDimension() {
    setWindowSize(window.innerWidth);
  }

  useEffect(() => {
    window.addEventListener("resize", updateDimension);
  }, [windowSize]);

  const navigate = useNavigate();
  const { isAuthenticated, logout, redirectToLogin } = useContext(UsersContext);
  // On vérifie si l'utilisateur est connecté.

  return (
    <UserProvider>
      <Header size={windowSize > 768 ? "desktop" : "mobile"} />
      <div>
        <InteractiveMap />
      </div>
      <Footer />
    </UserProvider>
  );
};

export default HomePage;
