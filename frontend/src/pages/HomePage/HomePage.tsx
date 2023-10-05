/* eslint-disable no-lone-blocks */
// import React, { useContext } from 'react'
import { UsersContext, UserProvider } from '../../contexts/UserContext';
import { useNavigate } from 'react-router-dom';
import InteractiveMap from '../../components/interactiveMap/InteractiveMap';
import { useContext, useEffect, useState } from 'react';

import Caroussel from '../../components/common/Caroussel/Caroussel';
import { CardType, City } from '../../utils/types';
import styles from './homePage.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const HomePage = () => {
   const [windowSize, setWindowSize] = useState<number>(window.innerWidth);

   function updateDimension() {
      setWindowSize(window.innerWidth);
   }

   useEffect(() => {
      window.addEventListener('resize', updateDimension);
   }, [windowSize]);

   const navigate = useNavigate();
   const { isAuthenticated, logout, redirectToLogin } =
      useContext(UsersContext);
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
   return (
      <>
         {windowSize > 768 ? (
            <>
               <section className={`${styles.backgroundWave}`}>
                  <div
                     className={`presentationText ${styles.presentationSection} `}
                  >
                     <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit. Illum blanditiis aperiam ad, aspernatur incidunt
                        voluptatem ea molestias nemo rem ratione nesciunt neque
                        corporis nihil recusandae cum minima. Id, voluptatum
                        tenetur?
                     </p>
                     <button
                        className={`buttonHomePage textButton ${styles.presentationButton}`}
                     >
                        Explorez
                     </button>
                  </div>
               </section>
               <section>
                  <div className={`${styles.mapSection}`}>
                     <InteractiveMap />
                  </div>
                  <div className={`${styles.pictoPlane}`}>
                     <img src="/picto_avion.png" alt="picto avion" />
                  </div>
               </section>
               <section className={`${styles.searchSection}`}>
                  <div className={`${styles.searchSectionBottomLine}`}>
                     <h2 className="subtitleCategoryDark">
                        Trouvez votre point d'intérêt !
                     </h2>
                     <h3 className="textCardDark">Laissez vous porter,</h3>
                     <h3 className="textCardDark">
                        nous allons vous faire découvrir des merveilles
                     </h3>
                  </div>
                  <div
                     className={`${styles.searchSectionBottomLine} ${styles.mockup}`}
                  >
                     <p>Composant avec barre de recherche et filtres</p>
                  </div>
                  <div className={`${styles.searchSectionBottomLine}`}>
                     <h2 className="subtitleCategoryDark">
                        Choisis une ville et trouve ses points d'intérêt
                     </h2>

                     <Caroussel
                        title="Villes"
                        data={selectedCities}
                        cardType={CardType.CITY}
                     />
                  </div>
               </section>
            </>
         ) : (
            <section className={`${styles.mobileSection}`}>
               <h1>CITY GUIDE</h1>
               <img src="/wave_with_map_mobile.svg" alt="wave with map" />
               <button
                  className={`buttonHomePage textButton ${styles.presentationButton}`}
               >
                  Explorez
               </button>
               <h2 className="subtitleCategoryDark">
                  Trouvez votre point d'intérêt !
               </h2>
            </section>
         )}
      </>
   );
};

export default HomePage;
