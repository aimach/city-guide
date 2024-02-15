import SearchPOI from "../SearchPOI/SearchPOI";
import styles from "./homePage.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import useWindowDimensions from "../../utils/hooks/useWindowDimensions";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const windowSize: number = useWindowDimensions();
  const navigate = useNavigate();

  return (
    <>
      {windowSize > 768 ? (
        <>
          <section className={`${styles.backgroundWave}`}>
            <div className={`presentationText ${styles.presentationSection} `}>
              <p>
                Que vous soyez passionné d'histoire, amateur d'art, amoureux de
                la nature ou à la recherche d'aventures uniques, parcourez City
                Guide à la découverte des points d'intérêt touristiques et
                culturels de vos régions !
              </p>
              <button
                className={`buttonHomePage textButton ${styles.presentationButton}`}
                onClick={() => navigate("/map")}
              >
                <FontAwesomeIcon icon={faPaperPlane} />
                Explorez
              </button>
            </div>
          </section>

          <section className={`${styles.searchSection}`}>
            <SearchPOI />
          </section>
        </>
      ) : (
        <section className={`${styles.mobileSection}`}>
          <h1>CITY GUIDE</h1>
          <img src="/wave_with_map_mobile.svg" alt="wave with map" />
          <button
            className={`buttonHomePage textButton ${styles.presentationButton}`}
          >
            Explorez
          </button>
          <SearchPOI />
        </section>
      )}
    </>
  );
};

export default HomePage;
