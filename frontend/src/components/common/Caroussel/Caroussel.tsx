import React from 'react';
import { CardType, City, DataType } from '../../../utils/types';
import styles from './caroussel.module.scss';
import Card from '../card/Card';

interface Props {
   title: string;
   data: DataType;
   cardType: CardType;
   onClickCategory?: (categoryName: string, cityName: string) => Promise<void>;
   currentCity?: City | null;
}

const Caroussel = ({
   title,
   data,
   cardType,
   onClickCategory,
   currentCity,
}: Props) => {
   const url = 'http://localhost:5000';

   return (
      <div className={styles.container}>
         <h2>{title}</h2>
         <div className={styles.cardsContainer}>
            {data.map(({ name, image, id }) => {
               return (
                  <Card
                     title={name}
                     id={id}
                     image={`${url}${image}`}
                     key={id}
                     cardType={cardType}
                     onClickCategory={onClickCategory}
                     currentCity={currentCity}
                  />
               );
            })}
         </div>
      </div>
   );
};

export default Caroussel;