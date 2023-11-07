import React, { useEffect, useRef, useState } from 'react';
import { CardType, City, DataType } from '../../../utils/types';
import styles from './caroussel.module.scss';
import Card from '../card/Card';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import {
   IoIosArrowDroprightCircle,
   IoIosArrowDropleftCircle,
} from 'react-icons/io';

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

   const [windowSize, setWindowSize] = useState<number>(window.innerWidth);

   function updateDimension() {
      setWindowSize(window.innerWidth);
   }

   useEffect(() => {
      window.addEventListener('resize', updateDimension);
   }, [windowSize]);

   const slider = useRef<any>(null);

   const settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: windowSize > 768 ? 4 : 1,
      slidesToScroll: 1,
      arrows: false,
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
         {(cardType === CardType.CATEGORY && data.length > 4) ||
         (cardType === CardType.CATEGORY && windowSize < 768) ? (
            <div className={styles.slider}>
               <button
                  className={`${styles.arrow} ${styles.prevArrow}`}
                  onClick={() => slider?.current?.slickPrev()}
               >
                  <IoIosArrowDropleftCircle />
               </button>
               <Slider ref={slider} {...settings}>
                  {cards as any}
               </Slider>
               <button
                  className={`${styles.arrow} ${styles.nextArrow}`}
                  onClick={() => slider?.current?.slickNext()}
               >
                  <IoIosArrowDroprightCircle />
               </button>
            </div>
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
