// import React, { useContext } from 'react'
import Header from "../../components/common/header/Header";
import { UsersContext, UserProvider } from "../../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import InteractiveMap from "../../components/interactiveMap/InteractiveMap";
import { useContext, useEffect, useState } from "react";
import Footer from "../../components/common/footer/Footer";
import style from "./homePage.module.scss";

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
        <section className={`${style.backgroundWave}`}>
          <div className={`presentationText ${style.presentationSection} `}>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illum
              blanditiis aperiam ad, aspernatur incidunt voluptatem ea molestias
              nemo rem ratione nesciunt neque corporis nihil recusandae cum
              minima. Id, voluptatum tenetur?
            </p>
            <button
              className={`buttonHomePage textButton ${style.presentationButton}`}
            >
              Explorez
            </button>
          </div>
        </section>
        <section>
          <div className={`${style.mapSection}`}>
            <InteractiveMap />
          </div>
          <div className={`${style.pictoPlane}`}>
            <img src="/picto_avion.png" alt="picto avion" />
          </div>
        </section>
        <section className={`${style.searchSection}`}>
          <div className={`${style.searchSectionBottomLine}`}>
            <h2 className="subtitleCategoryDark">
              Trouvez votre point d'intérêt !
            </h2>
            <h3 className="textCardDark">Laissez vous porter,</h3>
            <h3 className="textCardDark">
              nous allons vous faire découvrir des merveilles
            </h3>
          </div>
          <div className={`${style.searchSectionBottomLine} ${style.mockup}`}>
            <p>Composant avec barre de recherche et filtres</p>
          </div>
          <div className={`${style.searchSectionBottomLine}`}>
            <h2 className="subtitleCategoryDark">
              Choisis une ville et trouve ses points d'intérêt
            </h2>
            <div className={`${style.mockup}`}>
              <p>Composant avec les cards des villes</p>
            </div>
          </div>
        </section>
      </div>
      <Footer />
      {/* <About /> */}
    </UserProvider>
  );
};

export default HomePage;
