import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { CardType, Category, City, Poi } from '../../utils/types';
import Caroussel from '../../component/common/Caroussel/Caroussel';
import styles from './poiListView.module.scss';

const PoiListView = () => {
   const { cityId } = useParams();
   const [currentCity, setCurrentCity] = useState<City | null>(null);
   const [searchedPoi, setSearchedPoi] = useState<Poi[] | null>(null);
   const [categories, setCategories] = useState<Category[] | null>(null);

   const getPoiByCity = async () => {
      try {
         const response = await fetch(
            `http://localhost:5000/api/cities/${cityId}`
         );
         const data = await response.json();
         setCurrentCity(data);
         setSearchedPoi(data.poi);
      } catch (error) {
         console.log(error);
      }
   };

   const getPoiByCityAndCategory = async (
      categoryName: string,
      cityName: string
   ): Promise<void> => {
      try {
         const response = await fetch(
            `http://localhost:5000/api/poi?city=${cityName}&category=${categoryName}`
         );
         const data = await response.json();
         setSearchedPoi(data);
      } catch (error) {
         console.log(error);
      }
   };

   console.log(searchedPoi);
   const getCategories = async () => {
      try {
         const response = await fetch(`http://localhost:5000/api/categories`);
         const data = await response.json();
         setCategories(data);
      } catch (error) {
         console.log(error);
      }
   };

   useEffect(() => {
      getPoiByCity();
      getCategories();
   }, []);

   return (
      <section className={styles.container}>
         <h1>{currentCity?.name}</h1>

         {categories && (
            <div className={styles.categories}>
               <Caroussel
                  title="Catégories"
                  data={categories}
                  cardType={CardType.CATEGORY}
                  onClickCategory={getPoiByCityAndCategory}
                  currentCity={currentCity}
               />
            </div>
         )}
         {searchedPoi && currentCity && (
            <div className={styles.poiList}>
               <Caroussel
                  title={`${searchedPoi.length} ${
                     searchedPoi.length > 1
                        ? "points d'intérêt trouvés"
                        : "point d'intérêt trouvé"
                  } `}
                  data={searchedPoi}
                  cardType={CardType.POI}
               />
            </div>
         )}
      </section>
   );
};

export default PoiListView;
