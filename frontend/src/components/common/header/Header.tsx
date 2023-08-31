import style from "./header.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMap,
  faMagnifyingGlass,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { User, UsersContext } from "../../../contexts/UserContext";

type headerProps = {
  size: string;
};

const Header = ({ size }: headerProps) => {
  const { profile } = useContext(UsersContext);

  let role = "visitor";
  if (profile != null) {
    role = profile.role;
  }

  return (
    <header
      className={
        size === "desktop" ? `${style.headerDesktop}` : `${style.headerMobile}`
      }
    >
      {size === "desktop" ? (
        <>
          <Link to="/">
            <h1>CITY GUIDE</h1>
          </Link>
          <nav className={`textButton ${style.menu}`}>
            <ul>
              <li>
                <a href="#parcourir">Parcourir</a>
              </li>
              <li>
                <a href="#abonnement">Abonnement</a>
              </li>
              <li>
                {role === "visitor" ? <Link to="/login">Connexion</Link> : null}
              </li>
            </ul>
            {role === "visitor" ? (
              <button className={`${style.buttonHeader} textButton`}>
                <Link to="/register">Nous rejoindre</Link>
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
