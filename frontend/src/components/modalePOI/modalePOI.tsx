import { Poi } from "../../utils/types";
import styles from "./modalePOI.module.scss";
import { useContext } from "react";
import { UsersContext } from "../../contexts/UserContext";
import { IoIosHeartEmpty, IoIosHeart } from "react-icons/io";
import { AiOutlineClose } from "react-icons/ai";
import { FaLocationDot } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";

interface Props {
  poi: Poi;
  onClose: () => void;
  handleFavourite: (id: string | null) => void;
  isLiked: (id: string | null) => boolean;
}

const ModalePOI = ({ poi, onClose, handleFavourite, isLiked }: Props) => {
  const { id, name, image, address, phoneNumber, description, coordinates } =
    poi;

  const { isAuthenticated } = useContext(UsersContext);

  const navigate = useNavigate();

  const imageURL = image.includes("public")
    ? `${process.env.REACT_APP_PUBLIC_BACKEND_URL}${image}`
    : image;

  return (
    <div className={styles.container}>
      <div className={styles.close} onClick={onClose}>
        <AiOutlineClose />
      </div>
      <div className={styles.imageContainer}>
        <img src={imageURL} alt={image} />
      </div>

      <div className={styles.header}>
        <h3>{name}</h3>
        <FaLocationDot
          onClick={() =>
            navigate(
              `/map?lat=${poi.coordinates.coordinates[0]}&long=${poi.coordinates.coordinates[1]}`
            )
          }
        />
        {isAuthenticated() ? (
          <div className={styles.icons}>
            <div onClick={() => handleFavourite(id)} data-testid="like-button">
              {isLiked(id) ? (
                <IoIosHeart
                  className={styles.filledHeart}
                  stroke="black"
                  strokeWidth={22}
                />
              ) : (
                <IoIosHeartEmpty className={styles.emptyHeart} />
              )}
            </div>
          </div>
        ) : null}
      </div>

      <div
        className={`${styles.details} ${
          !isAuthenticated() ? styles.center : ""
        }`}
      >
        {isAuthenticated() ? (
          <>
            <div>
              <h4>Adresse</h4>
              <p>{address}</p>
            </div>
            {phoneNumber ? (
              <div>
                <h4>Numéro de téléphone</h4>
                <p>{phoneNumber}</p>
              </div>
            ) : null}
            <div>
              <h4>Coordonnées GPS</h4>
              <p>Latitude : {coordinates.coordinates[0]}</p>
              <p>Longitude : {coordinates.coordinates[1]}</p>
            </div>
            <div>
              <h4>Description</h4>
              <p>{description}</p>
            </div>
          </>
        ) : (
          <>
            <p>
              Vous devez être connecté pour voir les détails du point d’intérêt.
            </p>
            <Link to="/auth/login">
              <button className={styles.loginButton}>Connexion</button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default ModalePOI;
