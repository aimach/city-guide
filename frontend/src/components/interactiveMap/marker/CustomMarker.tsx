import { Marker, Popup, useMap } from "react-leaflet";
import L, { LatLngTuple } from "leaflet";
import "./customMarker.scss";
// @ts-ignore
import iconSVG from "../../../assets/marker.svg";

const CustomMarker = ({
  name,
  position,
  image,
  address,
  phoneNumber,
  description,
}: {
  name: string;
  position: LatLngTuple;
  image: string;
  address: string;
  phoneNumber: number;
  description: string;
}) => {
  const customIcon = new L.Icon({
    iconUrl: iconSVG,
    iconSize: [50, 50],
    iconAnchor: [12, 50],
  });
  const map = useMap();

  return (
    <Marker
      position={position}
      icon={customIcon}
      eventHandlers={{
        click: () => {
          map.setView([position[0] + 0.02, position[1]], 13);
        },
      }}
    >
      <Popup className="popup--container">
        <img src={image} alt={name} className="popup-image" />
        <h3>{name}</h3>
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
      </Popup>
    </Marker>
  );
};

export default CustomMarker;
