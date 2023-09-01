import React, { useContext, useState } from 'react';
import styles from './cards.module.scss';
import { IoIosHeartEmpty, IoIosHeart } from 'react-icons/io';
import { CardType, City } from '../../../utils/types';
import { useNavigate } from 'react-router-dom';
import { UsersContext } from '../../../contexts/UserContext';
import {
   addFavouriteCityToUser,
   addFavouritePoiToUser,
   removeFavouriteCityToUser,
   removeFavouritePoiToUser,
} from '../../../utils/api';

interface Props {
   id: string | null;
   title: string;
   image: string;
   cardType: CardType;
   onClickCategory?: (categoryName: string, cityName: string) => Promise<void>;
   currentCity?: City | null;
}

const Card = ({
   title,
   image,
   cardType,
   id,
   onClickCategory,
   currentCity,
}: Props) => {
   const navigate = useNavigate();

   const { isAuthenticated, profile } = useContext(UsersContext);
   const userId = profile?.id ?? '';
   let favouriteCitiesId: string[] = [];
   let favouritePoiId: string[] = [];
   if (profile != null) {
      favouriteCitiesId = profile.favouriteCities?.map((city) => city.id!);
      favouritePoiId = profile.favouritePoi.map((poi) => poi.id!);
   }

   const [favouriteCities, setFavouriteCities] =
      useState<string[]>(favouriteCitiesId);

   const [favouritePoi, setFavouritePoi] = useState<string[]>(favouritePoiId);

   const isLiked = (): boolean => {
      if (cardType === CardType.CITY) {
         return favouriteCities.includes(id!);
      }
      if (cardType === CardType.POI) {
         return favouritePoi.includes(id!);
      }
      return false;
   };

   const handleUserFavouriteCities = (
      cityId: string,
      userId: string,
      favouriteCities: string[]
   ) => {
      if (favouriteCities != null) {
         if (favouriteCities.find((city) => city === cityId)) {
            removeFavouriteCityToUser(cityId, userId);
            setFavouriteCities((state) =>
               state!.filter((city) => city !== cityId)
            );
         } else {
            addFavouriteCityToUser(cityId, userId);
            setFavouriteCities((state) => [...state, cityId]);
         }
      }
   };

   const handleUserFavouritePoi = (
      poiId: string,
      userId: string,
      favouritePoi: string[]
   ) => {
      if (favouritePoi != null) {
         if (favouritePoi.find((poi) => poi === poiId)) {
            removeFavouritePoiToUser(poiId, userId);
            setFavouritePoi((state) => state.filter((poi) => poi !== poiId));
         } else {
            addFavouritePoiToUser(poiId, userId);
            setFavouritePoi((state) => [...state, poiId]);
         }
      }
   };

   const selectActionOnCardClick = () => {
      switch (cardType) {
         case CardType.CITY:
            navigate(`poi/${id}`);
            break;
         case CardType.CATEGORY:
            if (currentCity != null) {
               onClickCategory!(title, currentCity?.name);
            }
            break;
      }
   };

   return (
      <div className={styles.container}>
         <div
            onClick={selectActionOnCardClick}
            className={styles.imageContainer}
         >
            <img src={image} alt={title} className={styles.image} />
            <h3 className={`${styles.title} titleCard`}>{title}</h3>
         </div>
         {cardType !== CardType.CATEGORY && isAuthenticated() ? (
            <div
               className={styles.likeContainer}
               onClick={() => {
                  cardType === CardType.CITY
                     ? handleUserFavouriteCities(id!, userId, favouriteCities)
                     : handleUserFavouritePoi(id!, userId, favouritePoi);
               }}
            >
               {isLiked() ? (
                  <IoIosHeart
                     className={styles.filledHeart}
                     stroke="black"
                     strokeWidth={22}
                  />
               ) : (
                  <IoIosHeartEmpty className={styles.emptyHeart} />
               )}
            </div>
         ) : (
            ''
         )}
      </div>
   );
};

export default Card;
