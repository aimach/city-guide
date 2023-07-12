import React, { useState } from 'react';
import styles from './cards.module.scss';
import { IoIosHeartEmpty, IoIosHeart } from 'react-icons/io';

interface Props {
   title: string;
   image: string;
}

const Card = ({ title, image }: Props) => {
   const [isLiked, setIsLiked] = useState(false);
   return (
      <div className={styles.container}>
         <div>
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
