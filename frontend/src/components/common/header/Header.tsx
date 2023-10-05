import style from "./header.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faMap,
	faMagnifyingGlass,
	faUser,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { UsersContext } from "../../../contexts/UserContext";
import { Role } from "../../../utils/types";

type headerProps = {
	size: string;
};

const Header = ({ size }: headerProps) => {
	const { profile } = useContext(UsersContext);

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

              {role === Role.VISITOR ? (
                <li>
                  <Link to="/auth/login">Connexion</Link>
                </li>
              ) : null}
            </ul>
            {role === Role.VISITOR ? (
              <button className={`${style.buttonHeader} textButton`}>
                <Link to="/auth/register">Nous rejoindre</Link>
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
