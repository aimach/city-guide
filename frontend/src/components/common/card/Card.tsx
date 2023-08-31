import React, { useContext, useState } from 'react';
import styles from './cards.module.scss';
import { IoIosHeartEmpty, IoIosHeart } from 'react-icons/io';
import { CardType, City } from '../../../utils/types';
import { useNavigate } from 'react-router-dom';
import { UsersContext } from '../../../contexts/UserContext';

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
   const [isLiked, setIsLiked] = useState(false);
   const navigate = useNavigate();

   const { isAuthenticated, profile } = useContext(UsersContext);
   const userId = profile?.id ?? '';

   const addFavouriteCityToUser = async (
      cityId: string,
      userId: string
   ): Promise<void> => {
      try {
         const response = await fetch(
            `http://localhost:5000/api/profile/fav/city/${userId}/${cityId}`,
            {
               method: 'POST',
               credentials: 'include',
               headers: {
                  'Content-Type': 'application/json',
                  Accept: 'application/json',
               },
               body: null,
            }
         );
         const data = await response.json();
         console.log(data);
      } catch (error) {
         console.log(error);
      }
   };

   return (
      <div className={styles.container}>
         <div
            onClick={() => {
               if (cardType === CardType.CITY) {
                  navigate(`poi/${id}`);
               }
               if (cardType === CardType.CATEGORY) {
                  if (currentCity) {
                     onClickCategory!(title, currentCity?.name);
                  }
               }
            }}
            className={styles.imageContainer}
         >
            <img src={image} alt={title} className={styles.image} />
            <h3 className={`${styles.title} titleCard`}>{title}</h3>
         </div>
         {cardType !== CardType.CATEGORY && isAuthenticated() ? (
            <div
               className={styles.likeContainer}
               onClick={() => {
                  setIsLiked((state) => !state);
                  addFavouriteCityToUser(id!, userId!);
               }}
            >
               {isLiked ? (
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
