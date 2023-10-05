import React, { useState } from 'react';
import { CardType, City, DataType } from '../../../utils/types';
import styles from './caroussel.module.scss';
import Card from '../card/Card';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

interface Props {
   title: string;
   data: DataType;
   cardType: CardType;
   onClickCategory?: (categoryName: string, cityName: string) => void;
   currentCity?: City | null;
}

const Caroussel = ({
   title,
   data,
   cardType,
   onClickCategory,
   currentCity,
}: Props) => {
   const [categorySelected, setCategorySelected] = useState<string | null>(
      null
   );

   const settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1,
   };

   const cards = data.map(({ name, image, id }) => {
      return (
         <Card
            title={name}
            id={id}
            image={image}
            key={id}
            cardType={cardType}
            onClickCategory={onClickCategory}
            categorySelected={categorySelected}
            chooseCategory={setCategorySelected}
            currentCity={currentCity}
         />
      );
   });
   return (
      <div className={styles.container}>
         <h2>{title}</h2>
         {cardType === CardType.CATEGORY && data.length > 4 ? (
            <Slider {...settings}>{cards as any}</Slider>
         ) : (
            <div className={styles.cardsContainer}>
               {data.map(({ name, image, id }) => {
                  return (
                     <Card
                        title={name}
                        id={id}
                        image={image}
                        key={id}
                        cardType={cardType}
                        onClickCategory={onClickCategory}
                        categorySelected={categorySelected}
                        chooseCategory={setCategorySelected}
                        currentCity={currentCity}
                     />
                  );
               })}
            </div>
         )}
      </div>
   );
};

export default Caroussel;
