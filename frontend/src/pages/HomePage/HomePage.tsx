// import React, { useContext } from 'react'
import Header from '../../components/common/header/Header';
import { UsersContext, UserProvider } from '../../contexts/UserContext';
import { useNavigate } from 'react-router-dom';
import InteractiveMap from '../../components/interactiveMap/InteractiveMap';
import { useContext, useEffect, useState } from 'react';
import Footer from '../../components/common/footer/Footer';
import './homePage.scss';
import Caroussel from '../../components/common/Caroussel/Caroussel';
import { CardType, City } from '../../utils/types';
import styles from './homePage.module.scss';

const HomePage = () => {
   /* const [windowSize, setWindowSize] = useState<number>(window.innerWidth);

   function updateDimension() {
      setWindowSize(window.innerWidth);
   }

   useEffect(() => {
      window.addEventListener('resize', updateDimension);
   }, [windowSize]); */

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

   //const nameOfSelectedCities = ['Paris', 'Lyon', 'Annecy', 'Strasbourg'];

   const selectedCities = cities?.slice(2, 6) ?? [];

   return (
      <div>
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
   );
};

export default HomePage;
