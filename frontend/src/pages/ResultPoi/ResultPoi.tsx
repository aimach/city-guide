import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { CardType, City, Poi } from '../../utils/types';
import Caroussel from '../../components/common/Caroussel/Caroussel';

const ResultPoi = () => {
   const { cityId } = useParams();
   const [currentCity, setCurrentCity] = useState<City | null>(null);
   const [searchedPoi, setSearchedPoi] = useState<Poi[] | null>(null);

   const getPoiByCity = async () => {
      try {
         const response = await fetch(
            `http://localhost:5000/api/cities/${cityId}`
         );
         const data = await response.json();
         console.log(data);
         setCurrentCity(data);
         setSearchedPoi(data.poi);
      } catch (error) {
         console.log(error);
      }
   };

   useEffect(() => {
      getPoiByCity();
   }, []);

   return (
      <div>
         {searchedPoi && currentCity && (
            <Caroussel
               title={currentCity?.name}
               data={searchedPoi}
               cardType={CardType.POI}
            />
         )}
      </div>
   );
};

export default ResultPoi;
