import {
  faCity,
  faEnvelope,
  faFolder,
  faHouse,
  faLocationDot,
  faUser,
  faUserPlus,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./AsideMenu.module.scss";
import { Link } from "react-router-dom";

const AsideMenu = () => {
  return (
    <section className={styles.contentAsideMenu}>
      <aside>
        <ul>
          <li className={`textButtonList`}>
            <span className={styles.itemFlex}>
              <FontAwesomeIcon icon={faHouse} className={styles.iconSpaces} />
              <Link to={"/"} className={styles.itemAsideMenu}>
                Retour sur le site
              </Link>
            </span>
          </li>
          <li className={`textButtonList`}>
            <span className={styles.itemFlex}>
              <FontAwesomeIcon icon={faUser} className={styles.iconSpaces} />
              <Link to="/dashboard/admin" className={styles.itemAsideMenu}>
                Administrateur
              </Link>
            </span>
            <ol>
              <li className={`textButtonSublist`}>
                <span
                  className={`${styles.itemFlex} ${styles.alignIconAndText}`}
                >
                  <FontAwesomeIcon
                    icon={faEnvelope}
                    className={styles.iconSpaces}
                  />
                  <Link
                    to="/dashboard/message"
                    className={styles.itemAsideMenu}
                  >
                    Messages
                  </Link>
                </span>
              </li>
              <li className={`textButtonSublist`}>
                <span className={styles.itemFlex}>
                  <FontAwesomeIcon
                    icon={faUser}
                    className={styles.iconSpaces}
                  />
                  <Link to="/dashboard/profil" className={styles.itemAsideMenu}>
                    Profils
                  </Link>
                </span>
              </li>
              <li className={`textButtonSublist`}>
                <span className={styles.itemFlex}>
                  <FontAwesomeIcon
                    icon={faCity}
                    className={styles.iconSpaces}
                  />

                  <Link to="/dashboard/cities" className={styles.itemAsideMenu}>
                    Villes
                  </Link>
                </span>
              </li>
              <li className={`textButtonSublist`}>
                <span className={styles.itemFlex}>
                  <FontAwesomeIcon
                    icon={faFolder}
                    className={styles.iconSpaces}
                  />
                  <Link
                    to="/dashboard/categories"
                    className={styles.itemAsideMenu}
                  >
                    Catégories
                  </Link>
                </span>
              </li>
              <li className={`textButtonSublist`}>
                <span className={styles.itemFlex}>
                  <FontAwesomeIcon
                    icon={faLocationDot}
                    className={styles.iconSpaces}
                  />

                  <Link to="/dashboard/poi" className={styles.itemAsideMenu}>
                    Point d'intérêts
                  </Link>
                </span>
              </li>
              <li className={`textButtonSublist`}>
                <span className={styles.itemFlex}>
                  <FontAwesomeIcon
                    icon={faUserPlus}
                    className={styles.iconSpaces}
                  />

                  <Link to="/dashboard/users" className={styles.itemAsideMenu}>
                    Utilisateurs
                  </Link>
                </span>
              </li>
            </ol>
          </li>
          <li className={`textButtonList`}>
            <span className={styles.itemFlex}>
              <FontAwesomeIcon icon={faUsers} className={styles.iconSpaces} />
              <Link to="/dashboard/adminCity" className={styles.itemAsideMenu}>
                Administrateur de ville
              </Link>
            </span>
            <ol>
              <li className={`textButtonSublist`}>
                <span className={styles.itemFlex}>
                  <FontAwesomeIcon
                    icon={faUser}
                    className={styles.iconSpaces}
                  />
                  <Link to="/dashboard/profil" className={styles.itemAsideMenu}>
                    Profils
                  </Link>
                </span>
              </li>
              <li className={`textButtonSublist`}>
                <span className={styles.itemFlex}>
                  <FontAwesomeIcon
                    icon={faLocationDot}
                    className={styles.iconSpaces}
                  />

                  <Link
                    to="/dashboard/adminCityPoi"
                    className={styles.itemAsideMenu}
                  >
                    Point d'intérêts
                  </Link>
                </span>
              </li>

              <li className={`textButtonSublist`}>
                <span className={styles.itemFlex}>
                  <FontAwesomeIcon
                    icon={faUser}
                    className={styles.iconSpaces}
                  />
                  <Link
                    to="/dashboard/adminCityUsers"
                    className={styles.itemAsideMenu}
                  >
                    Utilisateurs
                  </Link>
                </span>
              </li>
            </ol>
          </li>
        </ul>
      </aside>
    </section>
  );
};

export default AsideMenu;
