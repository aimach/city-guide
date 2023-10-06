/* eslint-disable no-lone-blocks */
// import React, { useContext } from 'react'

import Header from '../../components/common/header/Header';
import { UsersContext, UserProvider } from '../../contexts/UserContext';
import { useNavigate, useSearchParams } from 'react-router-dom';
import InteractiveMap from '../../components/interactiveMap/InteractiveMap';
import { useContext, useEffect, useState } from 'react';

import Footer from '../../components/common/footer/Footer';
import SearchPOI from '../SearchPOI/SearchPOI';
import Caroussel from '../../components/common/Caroussel/Caroussel';
import { CardType, City } from '../../utils/types';
import styles from './homePage.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

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
                        <FontAwesomeIcon icon={faPaperPlane} />
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
                  <SearchPOI />
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
               <SearchPOI />
            </section>
         )}
      </>
   );
};

export default HomePage;
