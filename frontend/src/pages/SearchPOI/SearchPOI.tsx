import { Link } from "react-router-dom";
import FilterSearch from "../../components/filterSearch/FilterSearch";
import styles from "./SearchPOI.module.scss";
import { useState, useEffect } from "react";
<<<<<<< HEAD
import Card from "../../components/common/card/Card";
=======
>>>>>>> c085a77d2c20bf63a311ad221e3fb9c4010571a8
import Caroussel from "../../components/common/Caroussel/Caroussel";
import { CardType, City } from "../../utils/types";

const SearchPOI = () => {
  const [filterSearch, setFilterSearch] = useState("");
  const [totalCities, setTotalCities] = useState<City[]>([]);
  const [citiesToBeShown, setCitiesToBeShown] = useState<City[]>([]);

  const getCities = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/cities`);
      const data = await response.json();
      setTotalCities(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCities();
  }, []);

<<<<<<< HEAD
  useEffect(() => {
    if (filterSearch) {
      setCitiesToBeShown(
        totalCities.filter((city) =>
          city.name.toLowerCase().startsWith(filterSearch.toLowerCase())
        )
      );
    } else {
      setCitiesToBeShown(totalCities.slice(0, 4) ?? []);
    }
  }, [filterSearch, totalCities]);

=======
  const allCitiesWithPoi = totalCities.filter(
    (city) => city.poi != null && city.poi.length > 0
  );

  useEffect(() => {
    if (filterSearch) {
      setCitiesToBeShown(
        allCitiesWithPoi.filter((city) =>
          city.name.toLowerCase().startsWith(filterSearch.toLowerCase())
        )
      );
    } else {
      setCitiesToBeShown(allCitiesWithPoi.slice(0, 4) ?? []);
    }
  }, [filterSearch, totalCities]);

>>>>>>> c085a77d2c20bf63a311ad221e3fb9c4010571a8
  return (
    <>
      <div className={styles.mainSearchPOI}>
        <section className={styles.titleSearchPOI}>
          <h2 className={`titlePOI`}>Trouvez votre point d’intéret !</h2>
          <div className={styles.subtitlePOI}>
            <h3 className={`subtitlePOI`}>Laissez vous portez ! </h3>
            <h3 className={`subtitlePOI`}>
              Nous allons vous faire découvrir des merveilles.
            </h3>
          </div>
        </section>
        <div className={styles.filterSearchComponent}>
          <h3 className={`subtitlePoiCity`}>
            Choisis une ville et trouve ses points d'intérêt sur la carte
          </h3>
          <FilterSearch
            filterSearch={filterSearch}
            setFilterSearch={setFilterSearch}
          />
          <Link
            className={`${styles.buttonSearchPoi} textButton`}
<<<<<<< HEAD
            to={`/map?search=${filterSearch}`}
=======
            to={`/carte?search=${filterSearch}`}
>>>>>>> c085a77d2c20bf63a311ad221e3fb9c4010571a8
          >
            Voir la carte
          </Link>
        </div>
        <div className={styles.separatingBorder}></div>
<<<<<<< HEAD
        <section className={styles.filterSearchComponent}>
=======
        <section className={styles.filterSearchComponent} id="cities">
>>>>>>> c085a77d2c20bf63a311ad221e3fb9c4010571a8
          <Caroussel
            title="Villes"
            data={citiesToBeShown}
            cardType={CardType.CITY}
          />
          {citiesToBeShown.length === 0 && (
            <>
              <p className={`${styles.messageToCreatePOI} baseText`}>
                Cette ville n'a pas encore de point d'intérêt. Soyez le premier
                à poster un point d'intérêt !
              </p>
              <Link
                className={`${styles.buttonSearchPoi} textButton`}
                to={`/createPoi`}
              >
                Créer un point d'intérêt
              </Link>
            </>
          )}
        </section>
      </div>
      <div className={styles.WaveImage}></div>
    </>
  );
};

export default SearchPOI;
