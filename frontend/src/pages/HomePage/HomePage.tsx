import InteractiveMap from "../../components/interactiveMap/InteractiveMap";
import style from "./homePage.module.scss";

const HomePage = () => {
  return (
    <>
      <section className={`${style.backgroundWave}`}>
        <div className={`presentationText ${style.presentationSection} `}>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illum
            blanditiis aperiam ad, aspernatur incidunt voluptatem ea molestias
            nemo rem ratione nesciunt neque corporis nihil recusandae cum
            minima. Id, voluptatum tenetur?
          </p>
          <button
            className={`buttonHomePage textButton ${style.presentationButton}`}
          >
            Explorez
          </button>
        </div>
      </section>
      <section className={`${style.mapSection}`}>
        <button
          className={`buttonHomePage textButton ${style.presentationButton} ${style.mapButton}`}
        >
          Voir la carte
        </button>
        <InteractiveMap />
      </section>
      <section className={`${style.searchSection}`}>
        <div className={`${style.searchSectionBottomLine}`}>
          <h2 className="subtitleCategoryDark">
            Trouvez votre point d'intérêt !
          </h2>
          <h3 className="textCardDark">Laissez vous porter,</h3>
          <h3 className="textCardDark">
            nous allons vous faire découvrir des merveilles
          </h3>
        </div>
        <div className={`${style.searchSectionBottomLine} ${style.mockup}`}>
          <p>Composant avec barre de recherche et filtres</p>
        </div>
        <div className={`${style.searchSectionBottomLine}`}>
          <h2 className="subtitleCategoryDark">
            Choisis une ville et trouve ses points d'intérêt
          </h2>
          <div className={`${style.mockup}`}>
            <p>Composant avec les cards des villes</p>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;
