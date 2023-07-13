import React, { useRef, useEffect, useState } from "react";
import maplibregl, { GeolocateControl } from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import styles from "./InteractiveMap.module.scss";
import { createMapLibreGlMapController } from "@maptiler/geocoding-control/maplibregl";
import { GeocodingControl } from "@maptiler/geocoding-control/react";

export default function InteractiveMap() {
  const mapContainer = useRef<any>(null);
  const map = useRef<any>(null);
  const [lng] = useState(139.753);
  const [lat] = useState(35.6844);
  const [zoom] = useState(14);
  const [API_KEY] = useState("bUNkGxzojTZOBuCGooQ2");
  const [mapController, setMapController] = useState<any>();
  const [latitude, setLatitude] = useState<number>(0);
  const [longitude, setLongitude] = useState<number>(0);

  useEffect(() => {
    if (map.current) return; // stops map from intializing more than once

    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: `https://api.maptiler.com/maps/streets-v2/style.json?key=${API_KEY}`,
      center: [lng, lat],
      zoom: zoom,
    });

    const geolocateControl = new GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true,
      },
      trackUserLocation: true,
    });
    map.current.addControl(geolocateControl);

    map.current.addControl(new maplibregl.NavigationControl(), "top-right");
    setMapController(createMapLibreGlMapController(map.current, maplibregl));
  }, [API_KEY, lng, lat, zoom]);

  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;

        setLatitude(latitude);
        setLongitude(longitude);
      },
      (error) => {
        console.log("Erreur de géolocalisation :", error.message);
      }
    );
  } else {
    console.log(
      "La géolocalisation n'est pas prise en charge par ce navigateur."
    );

    console.log("Latitude :", latitude);
    console.log("Longitude :", longitude);
  }

  return (
    <div className={`${styles.mapWrap}`}>
      <div className={styles.geocoding}>
        <GeocodingControl apiKey={API_KEY} mapController={mapController} />
      </div>
      <div ref={mapContainer} className={`${styles.mapWrap}`} />
    </div>
  );
}
