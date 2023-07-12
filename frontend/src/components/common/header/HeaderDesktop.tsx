import style from "./headerDesktop.module.scss";

const HeaderDesktop = () => {
  return (
    <header className={`${style.headerDesktop}`}>
      <h1>City Guide</h1>
      <nav className={`textButton ${style.menu}`}>
        <ul>
          <li>Parcourir</li>
          <li>Abonnement</li>
          <li>Connexion</li>
        </ul>
        <button className={`${style.buttonHeader} textButton`}>
          Nous rejoindre
        </button>
      </nav>
    </header>
  );
};

export default HeaderDesktop;
