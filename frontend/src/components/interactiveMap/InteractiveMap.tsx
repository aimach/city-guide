import axios from "axios";
import style from "./InteractiveMap.module.scss";
import { MapContainer, TileLayer } from "react-leaflet";
import { useEffect, useState } from "react";
import { LatLngTuple, Point } from "leaflet";
import CustomMarker from "../interactiveMap/marker/CustomMarker";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";

type coordinates = {
  type: Point;
  coordinates: LatLngTuple;
};
const InteractiveMap = () => {
  const [data, setData] = useState<
    Array<{
      name: string;
      image: string;
      coordinates: coordinates;
      address: string;
      phoneNumber: number;
      description: string;
    }>
  >([]);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/poi");
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <MapContainer
        className={`${style.map}`}
        center={[46.232193, 2.209667]}
        zoom={6}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://tile.jawg.io/78a4b677-e817-42a6-8184-16a7c7017384/{z}/{x}/{y}{r}.png?access-token=VsqNhlNeeh2fYcI97JN1VuaKPpHNNeQSYYllqIf29xrB8in1XrrCycJkjpz6aJZX"
        />
        <>
          {data.map((poi, index) => {
            // GET LAT/LONG
            console.log(poi);

            const latitude = poi.coordinates.coordinates[0];
            const longitude = poi.coordinates.coordinates[1];

            // poi.coordinates.map((e) => {
            //   console.log(e);
            // });
            // const latitude = poi.coordinates[0];
            // const longitude = poi.coordinates[1];
            return (
              <CustomMarker
                key={index}
                position={[latitude, longitude]}
                name={poi.name}
                image={poi.image}
                address={poi.address}
                phoneNumber={poi.phoneNumber}
                description={poi.description}
              />
            );
          })}
        </>
      </MapContainer>
    </>
  );
};

export default InteractiveMap;
