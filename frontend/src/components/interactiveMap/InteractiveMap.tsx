import style from "./InteractiveMap.module.scss";
// import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";

const InteractiveMap = () => {
  return (
    <>
      <div className={`${style.titleStyle} titleResearch`}>
        Trouvez votre point d'intérêt !
      </div>
      <button className={`buttonHomePage textButton ${style.mapButton}`}>
        Voir la carte
        <FontAwesomeIcon icon={faLocationDot} />
      </button>
      <div>
        <img
          src="/mockup-map.png"
          alt="mockup map"
          className={`${style.mockupImg}`}
        />
        {/* <MapContainer
          className={`${style.map}`}
          center={[51.505, -0.09]}
          zoom={13}
          scrollWheelZoom={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[51.505, -0.09]}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
        </MapContainer> */}
      </div>
    </>
  );
};

export default InteractiveMap;
