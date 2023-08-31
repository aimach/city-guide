import React, { useState } from 'react';
import styles from './cards.module.scss';
import { IoIosHeartEmpty, IoIosHeart } from 'react-icons/io';
import { CardType, City } from '../../../utils/types';
import { Link, Navigate, useNavigate } from 'react-router-dom';

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
         {cardType !== CardType.CATEGORY ? (
            <div
               className={styles.likeContainer}
               onClick={() => setIsLiked(!isLiked)}
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
