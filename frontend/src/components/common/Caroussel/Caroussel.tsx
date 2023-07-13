import React from 'react';
import { CardType, DataType } from '../../../utils/types';
import styles from './caroussel.module.scss';
import Card from '../card/Card';

interface Props {
   title: string;
   data: DataType;
   cardType: CardType;
}

const Caroussel = ({ title, data, cardType }: Props) => {
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
                  />
               );
            })}
         </div>
      </div>
   );
};

export default Caroussel;
