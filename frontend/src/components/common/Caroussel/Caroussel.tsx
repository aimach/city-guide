import React from 'react';
import { DataType } from '../../../utils/types';
import styles from './caroussel.module.scss';

interface Props {
   title: string;
   data: DataType;
}

const Caroussel = ({ title, data }: Props) => {
   return (
      <div>
         <h2>{title}</h2>
         <div className={styles.cardsContainer}></div>
      </div>
   );
};

export default Caroussel;
