import { useEffect } from "react";
import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";
import { useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./searchBar.scss";

type SearchBarPropsType = {
  lat: string | null;
  long: string | null;
};

const SearchBar = ({ lat, long }: SearchBarPropsType) => {
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
    if (lat && long) {
      map.flyTo([parseFloat(lat), parseFloat(long)], 13);
    }

    const onResultSelected = (event: any) => {
      const selectedResult = event.location;

      if (selectedResult) {
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
