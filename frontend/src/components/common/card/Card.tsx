import React, { useState } from 'react';
import styles from './cards.module.scss';
import { IoIosHeartEmpty, IoIosHeart } from 'react-icons/io';
import { CardType } from '../../../utils/types';
import { Link, Navigate, useNavigate } from 'react-router-dom';

interface Props {
   id: string | null;
   title: string;
   image: string;
   cardType: CardType;
}

const Card = ({ title, image, cardType, id }: Props) => {
   const [isLiked, setIsLiked] = useState(false);
   const navigate = useNavigate();

   return (
      <div className={styles.container}>
         <div
            onClick={() => {
               if (cardType !== CardType.POI) {
                  navigate(`poi/${id}`);
               }
            }}
         >
            <img src={image} alt={title} className={styles.image} />
         </div>
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
         <h3 className={`${styles.title} titleCard`}>{title}</h3>
      </div>
   );
};

export default Card;
