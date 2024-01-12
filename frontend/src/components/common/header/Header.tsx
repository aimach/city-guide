import style from "./header.module.scss";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMap, faHouse, faUser } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { UsersContext } from "../../../contexts/UserContext";
import { Role } from "../../../utils/types";

type headerProps = {
  size: string;
};

const Header = ({ size }: headerProps) => {
  // get user's role
  const { profile, logout } = useContext(UsersContext);

  const navigate = useNavigate();

  let role = Role.VISITOR;
  if (profile != null) {
    role = profile.role;
  }

  const imageURL: string | undefined = profile?.image
    ? profile?.image?.slice(1)
    : undefined;

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
            <Link to="/" onClick={() => setDisplayProfileMenu(false)}>
              <h1>CITY GUIDE</h1>
            </Link>
            <nav className={` ${style.menu}`}>
              <ul className="textButton">
                <li>
                  <a
                    href="#parcourir"
                    onClick={() => setDisplayProfileMenu(false)}
                  >
                    Parcourir
                  </a>
                </li>

                {role === Role.VISITOR ? (
                  <li>
                    <Link
                      to="/auth/login"
                      onClick={() => setDisplayProfileMenu(false)}
                    >
                      Connexion
                    </Link>
                  </li>
                ) : null}
                {role === Role.ADMIN || role === Role.ADMIN_CITY ? (
                  <li>
                    <Link
                      to="/dashboard"
                      onClick={() => setDisplayProfileMenu(false)}
                    >
                      Dashboard
                    </Link>
                  </li>
                ) : null}
              </ul>
              {role === Role.VISITOR ? (
                <button className={`${style.buttonHeader} textButton`}>
                  <Link
                    to="/auth/register"
                    onClick={() => setDisplayProfileMenu(false)}
                  >
                    Nous rejoindre
                  </Link>
                </button>
              ) : (
                <button
                  className={`${style.avatarButton} textButton`}
                  onClick={() => {
                    setDisplayProfileMenu(!displayProfileMenu);
                  }}
                >
                  {profile?.image !== null ? (
                    <img
                      src={`http://localhost:5000${imageURL}`}
                      alt="avatar"
                    />
                  ) : (
                    profile?.username.substring(0, 1).toUpperCase()
                  )}
                </button>
              )}
              {displayProfileMenu ? (
                <div className={`${style.floatingMenu}`}>
                  <Link to="/profile/page">
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
            <Link to="/map">
              <FontAwesomeIcon icon={faMap} className={`${style.iconStyle}`} />
            </Link>
            <Link to="/">
              <FontAwesomeIcon
                icon={faHouse}
                className={`${style.iconStyle}`}
              />
            </Link>
            <Link to="/profile/menu">
              <FontAwesomeIcon icon={faUser} className={`${style.iconStyle}`} />
            </Link>
          </nav>
        )}
      </header>
    </>
  );
};

export default Header;
