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
import { AiOutlineConsoleSql } from "react-icons/ai";

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

  const { isAuthenticated, profile } = useContext(UsersContext);
  const [favouriteUserPoi, setFavouriteUserPoi] = useState<Poi[] | null>(null);

  const imageURL = image.includes("public")
    ? `${process.env.REACT_APP_PUBLIC_BACKEND_URL}${image}`
    : image;

  useEffect(() => {
    if (profile) {
      setFavouriteUserPoi(profile.favouritePoi);
    }
  }, [profile]);

  const handleUserFavouritePoi = (
    poiId: string,
    userId: string,
    favouritePoi: Poi[]
  ) => {
    if (favouritePoi != null) {
      if (favouritePoi.find((poi) => poi.id === poiId)) {
        removeFavouritePoiToUser(poiId, userId);
        favouriteUserPoi?.filter((poi) => poi.id !== poiId);
      } else {
        console.log("hellooooo");
        addFavouritePoiToUser(poiId, userId);
      }
    }
  };

  const isLiked = (id: string | null): Poi | undefined => {
    return favouriteUserPoi?.find((poi) => poi.id === id);
  };

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
          <h3>{name}</h3>
          {isAuthenticated() ? (
            <div className={styles.icons}>
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
