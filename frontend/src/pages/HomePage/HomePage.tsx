// import React, { useContext } from 'react'
import Header from "../../components/common/header/Header";
import { UsersContext, UserProvider } from "../../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import InteractiveMap from "../../components/interactiveMap/InteractiveMap";
import { useContext, useEffect, useState } from "react";
import Footer from "../../components/common/footer/Footer";
import "./homePage.scss";
import Caroussel from '../../components/common/Caroussel/Caroussel';
import { CardType, City } from '../../utils/types';
import styles from './homePage.module.scss';

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

  const [cities, setCities] = useState<City[] | null>(null);

  const getAllCities = async (): Promise<void> => {
     const response = await fetch('http://localhost:5000/api/cities');
     const data = await response.json();
     setCities(data);
  };
  useEffect(() => {
     getAllCities();
  }, []);

  const selectedCities = cities?.slice(2, 6) ?? [];

  <div>
  {windowSize > 768 ? (
    <>
      <section className={`${style.backgroundWave}`}>
        <div className={`presentationText ${style.presentationSection} `}>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illum
            blanditiis aperiam ad, aspernatur incidunt voluptatem ea
            molestias nemo rem ratione nesciunt neque corporis nihil
            recusandae cum minima. Id, voluptatum tenetur?
          </p>
          <button
            className={`buttonHomePage textButton ${style.presentationButton}`}
          >
            <FontAwesomeIcon icon={faPaperPlane} />
            Explorez
          </button>
        </div>
      </section>
      <section>
        <div className={`${style.mapSection}`}>
          <InteractiveMap />
          <div className={styles.carousselContainer}>
            <h2 className={styles.title}>
               Choisis une ville et trouve ses points d'intérêt.
            </h2>
            <Caroussel
               title="Villes"
               data={selectedCities}
               cardType={CardType.CITY}
            />
         </div>
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
    </>
  ) : (
    <section className={`${style.mobileSection}`}>
      <h1>CITY GUIDE</h1>
      <img src="/wave_with_map_mobile.svg" alt="wave with map" />
      <button
        className={`buttonHomePage textButton ${style.presentationButton}`}
      >
        <FontAwesomeIcon icon={faPaperPlane} />
        Explorez
      </button>
      <h2 className="subtitleCategoryDark">
        Trouvez votre point d'intérêt !
      </h2>
    </section>
  )}
</div>
);
};

export default HomePage;
