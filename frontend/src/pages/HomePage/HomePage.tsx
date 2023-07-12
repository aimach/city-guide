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
      <section>
        <InteractiveMap />
      </section>
      <section>
        <h2>Trouvez votre point d'intérêt !</h2>
      </section>
    </>
  );
};

export default HomePage;
