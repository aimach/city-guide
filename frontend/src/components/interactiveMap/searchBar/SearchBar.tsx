import { useEffect } from "react";
import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";
import { useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./searchBar.scss";

const SearchBar = () => {
  const provider = new OpenStreetMapProvider({
    params: {
      "accept-language": "fr",
      countrycodes: "fr",
      addressdetails: 1,
      namedetails: 1,
    },
  });

  const searchControl = GeoSearchControl({
    provider: provider,
    searchLabel: "Rechercher...",
    showMarker: false,
  });

  const map = useMap();

  useEffect(() => {
    map.addControl(searchControl);

    return () => {
      map.removeControl(searchControl);
    };
  }, [map, searchControl]);

  useEffect(() => {
    const onResultSelected = (event: any) => {
      const selectedResult = event.location;

      if (selectedResult) {
        const circle = L.circle([selectedResult.y, selectedResult.x], {
          color: "#090f43",
          fillColor: "#090f43",
          fillOpacity: 0.5,
          radius: 5000,
        }).addTo(map);

        map.fitBounds(circle.getBounds());

        map.flyTo([selectedResult.y, selectedResult.x], 11);
      }
    };

    map.on("geosearch/showlocation", onResultSelected);

    return () => {
      map.off("geosearch/showlocation", onResultSelected);
    };
  }, [map]);

  useEffect(() => {
    map.locate().on("locationfound", function (e) {
      map.flyTo(e.latlng, map.getZoom());
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
};

export default SearchBar;
