import React from 'react';
import styles from './cards.module.scss';
import { IoIosHeartEmpty } from 'react-icons/io';

interface Props {
   title: string;
   image: string;
}

const Card = ({ title, image }: Props) => {
   return (
      <div className={styles.container}>
         <div>
            <img src={image} alt={title} className={styles.image} />
         </div>
         <div className={styles.likeContainer}>
            <IoIosHeartEmpty />
         </div>
         <h3 className={`${styles.title} titleCard`}>{title}</h3>
      </div>
   );
};

export default Card;
