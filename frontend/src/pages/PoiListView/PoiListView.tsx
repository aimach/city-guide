import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { CardType, Category, City, Poi } from '../../utils/types';
import Caroussel from '../../components/common/Caroussel/Caroussel';
import styles from './poiListView.module.scss';

const PoiListView = () => {
   const { cityId } = useParams();
   const [currentCity, setCurrentCity] = useState<City | null>(null);
   const [searchedPoi, setSearchedPoi] = useState<Poi[] | null>(null);

   const getCity = async () => {
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

   let categories: Category[] = [];
   const poicategories = searchedPoi?.map((poi) => poi.category) ?? [];

   const filterCategories = () => {
      poicategories.forEach((cat) => {
         if (!categories.find((category) => category.id === cat.id)) {
            categories.push(cat);
         }
      });
   };

   filterCategories();

   const getPoiByCityAndCategory = async (
      categoryName?: string,
      cityName?: string
   ): Promise<void> => {
      try {
         const response = await fetch(
            `http://localhost:5000/api/poi?city=${cityName}&category=${categoryName}`
         );
         const data = await response.json();
         console.log({ data });

         if (!data.error) {
            setSearchedPoi(data);
         }
      } catch (error) {
         console.log(error);
      }
   };

   useEffect(() => {
      getCity();
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
