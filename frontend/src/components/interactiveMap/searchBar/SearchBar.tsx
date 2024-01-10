// Importez les modules nécessaires
import { useEffect } from "react";
import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";
import { useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css"; // Assurez-vous d'importer le CSS de Leaflet
import "./searchBar.scss";
// @ts-ignore

const SearchBar = () => {
  // Créez une instance du fournisseur de recherche (OpenStreetMap dans ce cas)
  const provider = new OpenStreetMapProvider({
    params: {
      "accept-language": "fr", // Langue des résultats
      countrycodes: "fr", //
      addressdetails: 1,
      namedetails: 1,
    },
  });

  // Créez une instance de GeoSearchControl avec l'icône personnalisée
  const searchControl = GeoSearchControl({
    provider: provider,
    searchLabel: "Entrer une ville, un point d'interet...",
    showMarker: false,
  });

  // Utilisez le hook useMap pour obtenir l'instance actuelle de la carte
  const map = useMap();

  // Ajoutez le GeoSearchControl à la carte
  useEffect(() => {
    map.addControl(searchControl);

    return () => {
      // Supprimez le GeoSearchControl lorsque le composant est démonté
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
  }, []);

  return null; // Ce composant ne rend rien visuellement
};

export default SearchBar;
