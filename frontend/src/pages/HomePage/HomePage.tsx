// import React, { useContext } from 'react'
import Header from "../../components/common/header/Header";
import { UsersContext, UserProvider } from "../../contexts/UserContext";
import { useNavigate } from "react-router-dom";
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
  console.log(isAuthenticated);

  return (
    <UserProvider>
      <Header size={windowSize > 768 ? "desktop" : "mobile"} />
      <div className="container-link-map">
        {/* <InteractiveMap /> */}
        <button>
          <span>Voir la carte</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="13"
            height="17"
            fill="none"
            viewBox="0 0 13 17"
          >
            <path
              fill="#090F43"
              d="M12.477 6.52c0 3.445-6.238 9.972-6.238 9.972S0 9.965 0 6.52a6.239 6.239 0 1 1 12.477 0Z"
            />
            <circle cx="6.238" cy="6.064" r="2.322" fill="#F3DF24" />
          </svg>
        </button>
      </div>
      <Footer />
    </UserProvider>
  );
};

export default HomePage;
