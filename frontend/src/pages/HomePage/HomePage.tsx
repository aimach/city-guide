import React, { useEffect, useState } from 'react';
import InteractiveMap from '../../components/interactiveMap/InteractiveMap';
import Card from '../../components/common/card/Card';
import Image from '../../assets/lapalettedugout.jpg';
import Caroussel from '../../components/common/Caroussel/Caroussel';
import { City } from '../../utils/types';
import styles from './homePage.module.scss';

const HomePage = () => {
   const [cities, setCities] = useState<City[] | null>(null);
   const getAllCities = async () => {
      const response = await fetch('http://localhost:5000/api/cities');
      const data = await response.json();
      setCities(data);
   };

   useEffect(() => {
      getAllCities();
   }, []);

   const nameOfSelectedCities = ['Paris', 'Lyon', 'Annecy', 'Strasbourg'];

   const selectedCities =
      cities?.filter((city) => nameOfSelectedCities.includes(city.name)) ?? [];

   return (
      <div>
         <InteractiveMap />
         <div className={styles.carousselContainer}>
            <h2 className={styles.title}>
               Choisis une ville et trouve ses points d'intérêt.
            </h2>
            <Caroussel title="Villes" data={selectedCities} />
         </div>
      </div>
   );
};

export default HomePage;
