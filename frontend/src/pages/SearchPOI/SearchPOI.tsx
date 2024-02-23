/* eslint-disable react-hooks/exhaustive-deps */
import { Link } from "react-router-dom";
import FilterSearch from "../../components/filterSearch/FilterSearch";
import styles from "./SearchPOI.module.scss";
import { useState, useEffect, useContext } from "react";
import Caroussel from "../../components/common/Caroussel/Caroussel";
import { CardType, City } from "../../utils/types";
import { UsersContext } from "../../contexts/UserContext";
import useWindowDimensions from "../../utils/hooks/useWindowDimensions";

const SearchPOI = () => {
  const [filterSearch, setFilterSearch] = useState("");
  const [totalCities, setTotalCities] = useState<City[]>([]);
  const [citiesToBeShown, setCitiesToBeShown] = useState<City[]>([]);

  const { isAuthenticated } = useContext(UsersContext);
  const windowSize = useWindowDimensions();

  const getCities = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_PUBLIC_BACKEND_URL}/api/cities`
      );
      const data = await response.json();
      setTotalCities(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCities();
  }, []);

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
          <Link className={`${styles.buttonSearchPoi} textButton`} to={"/map"}>
            Voir la carte
          </Link>
        </div>
        {windowSize > 768 && (
          <section>
            <div className={`${styles.pictoPlane}`}>
              <img src="/picto_avion.png" alt="picto avion" />
            </div>
          </section>
        )}

        <section className={styles.filterSearchComponent} id="cities">
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
              {isAuthenticated() ? (
                <Link
                  className={`${styles.buttonSearchPoi} textButton`}
                  to={`/contribution`}
                >
                  Créer un point d'intérêt
                </Link>
              ) : (
                <Link
                  className={`${styles.buttonSearchPoi} textButton`}
                  to={`/auth/login`}
                >
                  Se connecter pour créer un point d'intérêt
                </Link>
              )}
            </>
          )}
        </section>
      </div>
    </>
  );
};

export default SearchPOI;
