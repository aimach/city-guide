import { Marker, Popup, useMap } from "react-leaflet";
import { Link } from "react-router-dom";
import L, { LatLngTuple } from "leaflet";
import "./customMarker.scss";
// @ts-ignore
import iconSVG from "../../../assets/marker.svg";
import { useContext, useEffect, useState } from "react";
import { UsersContext } from "../../../contexts/UserContext";
import styles from "../../modalePOI/modalePOI.module.scss";
import {
  removeFavouritePoiToUser,
  addFavouritePoiToUser,
} from "../../../utils/api";
import { Poi } from "../../../utils/types";
import { IoIosHeartEmpty, IoIosHeart } from "react-icons/io";

const CustomMarker = ({
  name,
  position,
  image,
  address,
  phoneNumber,
  description,
  poiId,
}: {
  name: string;
  position: LatLngTuple;
  image: string;
  address: string;
  phoneNumber: number;
  description: string;
  poiId: string;
}) => {
  const customIcon = new L.Icon({
    iconUrl: iconSVG,
    iconSize: [50, 50],
    iconAnchor: [12, 50],
  });
  const map = useMap();

  const { isAuthenticated, profile, checkUserSession } =
    useContext(UsersContext);
  const [favouriteUserPoi, setFavouriteUserPoi] = useState<Poi[] | null>(null);

  const imageURL = image.includes("public")
    ? `${process.env.REACT_APP_PUBLIC_BACKEND_URL}${image}`
    : image;

  const handleUserFavouritePoi = (
    poiId: string,
    userId: string,
    favouritePoi: Poi[]
  ) => {
    if (favouritePoi != null) {
      if (favouritePoi.find((poi) => poi.id === poiId)) {
        removeFavouritePoiToUser(poiId, userId);
        const newFavoritePoi = favouritePoi.filter((poi) => poi.id !== poiId);
        setFavouriteUserPoi(newFavoritePoi);
      } else {
        addFavouritePoiToUser(poiId, userId);
        setFavouriteUserPoi(profile?.favouritePoi as Poi[]);
        checkUserSession();
      }
    }
  };

  const isLiked = (id: string | null): Poi | undefined => {
    return favouriteUserPoi?.find((poi) => poi.id === id);
  };

  useEffect(() => {
    if (profile) {
      setFavouriteUserPoi(profile.favouritePoi);
    }
  }, [profile]);

  return (
    <Marker
      position={position}
      icon={customIcon}
      eventHandlers={{
        click: () => {
          map.flyTo([position[0] + 0.02, position[1]], 13);
        },
      }}
    >
      <Popup className="popup--container">
        <img src={imageURL} alt={name} className="popup-image" />
        <div>
          <div className={styles.titleContainer}>
            <h3>{name}</h3>
            <div
              onClick={() => {
                if (profile !== null)
                  handleUserFavouritePoi(
                    poiId,
                    profile.id as string,
                    favouriteUserPoi as Poi[]
                  );
              }}
              data-testid="like-button"
              className={styles.likeButtonContainer}
            >
              {isLiked(poiId) ? (
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
          {isAuthenticated() ? (
            <div className={styles.icons}>
              <div className="secondary_info">
                <h4>Adresse</h4>
                <p>{address}</p>
                <h4>Numéro de téléphone</h4>
                <p>{phoneNumber}</p>
                <h4>Coordonnées GPS</h4>
                <span>Latitude : {position[0]} </span>
                <span>Longitude : {position[1]}</span>
                <h4>Description</h4>
                <p>{description}</p>
              </div>
            </div>
          ) : (
            <>
              <p>
                Vous devez être connecté pour voir les détails du point
                d’intérêt.
              </p>
              <Link to="/auth/login">
                <button className="loginButton">Connexion</button>
              </Link>
            </>
          )}
        </div>
      </Popup>
    </Marker>
  );
};

export default CustomMarker;
