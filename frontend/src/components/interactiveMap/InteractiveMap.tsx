import React, { useRef, useEffect, useState } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import styles from "./InteractiveMap.module.scss";
import { GeocodingControl } from "@maptiler/geocoding-control/maplibregl";

export default function InteractiveMap() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<maplibregl.Map>();
  const marker = useRef<maplibregl.Marker>();
  const [lng] = useState(139.753);
  const [lat] = useState(35.6844);
  const [zoom] = useState(14);
  const [API_KEY] = useState("bUNkGxzojTZOBuCGooQ2");

  useEffect(() => {
    if (map.current) return;

    map.current = new maplibregl.Map({
      container: mapContainer.current!,
      style: `https://api.maptiler.com/maps/satellite/style.json?key=${API_KEY}`,
      center: [lng, lat],
      zoom: zoom,
    });

    map.current.addControl(new maplibregl.NavigationControl(), "top-right");
    new maplibregl.Marker({ color: "#FF0000" })
      .setLngLat([139.7525, 35.6846])
      .addTo(map.current);

    marker.current = new maplibregl.Marker({ color: "#FF0000" })
      .setLngLat([139.7525, 35.6846])
      .addTo(map.current);

    const popup = new maplibregl.Popup({ offset: 25 }).setText(
      "Hello, this is a popup!"
    );
    marker.current.setPopup(popup);

    const geocodingControl = new GeocodingControl({
      apiKey: API_KEY,
      // @ts-ignore
      maplibregl,
    });
    map.current.addControl(geocodingControl, "top-left");
  }, [API_KEY, lng, lat, zoom]);

  navigator.geolocation.getCurrentPosition(
    (position) => {
      const { latitude, longitude } = position.coords;

      const marker = new maplibregl.Marker()
        .setLngLat([longitude, latitude])
        .addTo(map.current!);
    },
    (error) => {
      console.log(error.message);
    }
  );

  return (
    <div className={`${styles.mapWrap}`}>
      <div ref={mapContainer} className={`${styles.mapWrap}`} />
    </div>
  );
}
