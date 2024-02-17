import {
  faCity,
  faEnvelope,
  faFolder,
  faHouse,
  faLocationDot,
  faUser,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./AsideMenu.module.scss";
import ItemLi from "../ItemLi/Itemli";
import { useContext } from "react";
import { UsersContext } from "../../../../contexts/UserContext";

const AsideMenu = () => {
  const { profile } = useContext(UsersContext);

  return (
    <>
      <section className={styles.contentAsideMenu}>
        <aside>
          <ul>
            <ItemLi icon={faHouse} name="Retour sur le site" path="/"></ItemLi>
            {profile?.role === "admin" ? (
              <ItemLi icon={faUser} name="Administrateur du site" path="">
                <ol>
                  <ul className={styles.alignIconAndText}>
                    <ItemLi
                      icon={faEnvelope}
                      name="Messages"
                      path="/dashboard/message"
                    ></ItemLi>
                  </ul>
                  <ItemLi
                    icon={faCity}
                    name="Villes"
                    path="/dashboard/cities"
                  ></ItemLi>
                  <ItemLi
                    icon={faFolder}
                    name="Catégories"
                    path="/dashboard/categories"
                  ></ItemLi>
                  <ItemLi
                    icon={faLocationDot}
                    name="Point d'intérêts"
                    path="/dashboard/poi"
                  ></ItemLi>
                </ol>
              </ItemLi>
            ) : (
              <ul className={`textButtonList`}>
                <ItemLi icon={faUsers} name="Administrateur de ville" path="">
                  <ol>
                    <ItemLi
                      icon={faLocationDot}
                      name="Point d'intérêts"
                      path="/dashboard/admin-city/poi"
                    ></ItemLi>
                  </ol>
                </ItemLi>
              </ul>
            )}
          </ul>
        </aside>
      </section>
    </>
  );
};

export default AsideMenu;
