import { useContext, useEffect, useRef, useState } from "react";
import style from "./header.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMap,
  faMagnifyingGlass,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { UsersContext } from "../../../contexts/UserContext";
import { Role } from "../../../utils/types";

type headerProps = {
  size: string;
};

const Header = ({ size }: headerProps) => {
  const navigate = useNavigate();

  // get user's role
  const { profile, logout } = useContext(UsersContext);

   let role = Role.VISITOR;
   if (profile != null) {
     role = profile.role;
   }


  // display profile menu
  const [displayProfileMenu, setDisplayProfileMenu] = useState(false);

  return (
    <>
      <header
        className={
          size === "desktop"
            ? `${style.headerDesktop}`
            : `${style.headerMobile}`
        }
      >
        {size === "desktop" ? (
          <>
            <Link to="/">
              <h1>CITY GUIDE</h1>
            </Link>
            <nav className={` ${style.menu}`}>
              <ul className="textButton">
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
                <button
                  className={`${style.avatarButton} textButton`}
                  onClick={() => {
                    setDisplayProfileMenu(!displayProfileMenu);
                  }}
                >
                  {profile?.image !== null ? (
                    <img src={profile?.image} alt="avatar" />
                  ) : (
                    profile?.username.substring(0, 1).toUpperCase()
                  )}
                </button>
              )}
              {displayProfileMenu ? (
                <div className={`${style.floatingMenu}`}>
                  <Link to="/profile">
                    <button
                      onClick={() => setDisplayProfileMenu(false)}
                      className="textFilter"
                    >
                      Mon profil
                    </button>
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setDisplayProfileMenu(false);
                      navigate("/");
                    }}
                    className="textFilter"
                  >
                    Se déconnecter
                  </button>
                </div>
              ) : null}
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
    </>
  );
};

export default Header;
