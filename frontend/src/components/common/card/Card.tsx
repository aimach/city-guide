import React, { useContext } from "react";
import styles from "./cards.module.scss";
import { IoIosHeartEmpty, IoIosHeart } from "react-icons/io";
import { CardType, Category, City, Poi } from "../../../utils/types";
import { UsersContext } from "../../../contexts/UserContext";

interface Props {
  data: Poi | Category | City;
  cardType: CardType;
  onClick: () => void;
  categorySelected?: string | null;
  currentCity?: City | null;
  handleFavourite: (id: string | null) => void;
  isLiked: (id: string | null) => boolean;
}

const Card = ({
  data,
  cardType,
  onClick,
  categorySelected,
  handleFavourite,
  isLiked,
}: Props) => {
  const { isAuthenticated } = useContext(UsersContext);

  const { id, name, image } = data;
  const imageURL = image.includes("public")
    ? `${process.env.REACT_APP_PUBLIC_BACKEND_URL}${image}`
    : image;
  return (
    <>
      <div
        className={`${styles.container} ${
          categorySelected !== id &&
          categorySelected != null &&
          cardType === CardType.CATEGORY &&
          styles.unselected
        } `}
      >
        <div
          onClick={onClick}
          className={styles.imageContainer}
          data-testid="image-container"
        >
          <img src={imageURL} alt={name} className={styles.image} />
          <h3 className={`${styles.title} titleCard`}>{name}</h3>
        </div>
        {cardType !== CardType.CATEGORY && isAuthenticated() ? (
          <button
            className={styles.likeContainer}
            onClick={() => {
              handleFavourite(id);
            }}
          >
            {isLiked(id) ? (
              <IoIosHeart
                className={styles.filledHeart}
                stroke="black"
                strokeWidth={22}
                data-testid="filled-heart"
              />
            ) : (
              <IoIosHeartEmpty
                className={styles.emptyHeart}
                data-testid="empty-heart"
              />
            )}
          </button>
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default Card;
