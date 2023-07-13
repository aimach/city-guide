import style from "./header.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMap,
  faMagnifyingGlass,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

type headerProps = {
  size: string;
};

const Header = ({ size }: headerProps) => {
  // waiting for user context
  const userRole: string = "free";

  return (
    <header
      className={
        size === "desktop" ? `${style.headerDesktop}` : `${style.headerMobile}`
      }
    >
      {size === "desktop" ? (
        <>
          <h1>City Guide</h1>
          <nav className={`textButton ${style.menu}`}>
            <ul>
              <li>Parcourir</li>
              <li>Abonnement</li>
              {userRole === "free" ? <li>Connexion</li> : null}
            </ul>
            {userRole === "free" ? (
              <button className={`${style.buttonHeader} textButton`}>
                Nous rejoindre
              </button>
            ) : (
              <div className={`${style.avatarButton}`} />
            )}
          </nav>
        </>
      ) : (
        <nav>
          <FontAwesomeIcon icon={faMap} className={`${style.iconStyle}`} />
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            className={`${style.iconStyle}`}
          />
          <FontAwesomeIcon icon={faUser} className={`${style.iconStyle}`} />
        </nav>
      )}
    </header>
  );
};

export default Header;
