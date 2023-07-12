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
          <h2>Trouvez votre point d'intérêt !</h2>
          <h3>Laissez vous porter,</h3>
          <h3>nous allons vous faire découvrir des merveilles</h3>
        </div>
        <div className={`${style.searchSectionBottomLine}`}>
          <p>Composant avec barre de recherche et filtres</p>
        </div>
        <div className={`${style.searchSectionBottomLine}`}>
          <h2>Choisis une ville et trouve ses points d'intérêt</h2>
        </div>
      </section>
    </>
  );
};

export default HomePage;
