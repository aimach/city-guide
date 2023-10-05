import React, { useRef, useEffect, useState } from "react";
import maplibregl, { GeolocateControl } from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import styles from "./InteractiveMap.module.scss";
import { createMapLibreGlMapController } from "@maptiler/geocoding-control/maplibregl";
import { GeocodingControl } from "@maptiler/geocoding-control/react";

export default function InteractiveMap() {
  const mapContainer = useRef<any>(null);
  const map = useRef<any>(null);
  const [lng] = useState(2.3488);
  const [lat] = useState(48.8534);
  const [zoom] = useState(14);

  const [mapController, setMapController] = useState<any>();
  // const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const bounds = [
      [-5.266007882805499, 41.303921508225445],
      [9.662499999999975, 51.12421275782688],
    ];
    if (map.current) return; // stops map from intializing more than once

    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: `https://api.maptiler.com/maps/streets-v2/style.json?key=${process.env.REACT_APP_MAPTILER_API_KEY}`,
      center: [lng, lat],
      zoom: zoom,
      bounds: bounds as any,
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
  }, [lng, lat, zoom]);

  return (
    <div className={`${styles.mapWrap}`}>
      <div className={`${styles.geocoding} ${styles.activeGeocoding}`}>
        <GeocodingControl
          apiKey={process.env.REACT_APP_MAPTILER_API_KEY!}
          mapController={mapController}
        />
      </div>
      <div ref={mapContainer} className={`${styles.mapWrap}`} />
    </div>
  );
}
