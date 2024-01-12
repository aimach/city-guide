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
import styles from "./AsideMenu.module.scss";
import ItemLi from "../ItemLi/Itemli";

const AsideMenu = () => {
  return (
    <section className={styles.contentAsideMenu}>
      <aside>
        <ul>
          <ItemLi icon={faHouse} name="Retour sur le site" path="/"></ItemLi>
          <ItemLi
            icon={faUser}
            name="Administrateur du site"
            path="/dashboard/admin/"
          >
            <ol>
              {/* className={`${styles.itemFlex} ${styles.alignIconAndText}`} */}
              <ItemLi
                icon={faEnvelope}
                name="Messages"
                path="/dashboard/admin/message"
              ></ItemLi>
              <ItemLi
                icon={faUser}
                name="Profils"
                path="/dashboard/admin/profilAdmin"
              ></ItemLi>

              <ItemLi
                icon={faCity}
                name="Villes"
                path="/dashboard/admin/cities"
              ></ItemLi>

              <ItemLi
                icon={faFolder}
                name="Catégories"
                path="/dashboard/admin/categories"
              ></ItemLi>

              <ItemLi
                icon={faLocationDot}
                name="Point d'intérêts"
                path="/dashboard/admin/poi"
              ></ItemLi>

              <ItemLi
                icon={faUserPlus}
                name="Utilisateurs"
                path="/dashboard/admin/users"
              ></ItemLi>
            </ol>
          </ItemLi>
          <li className={`textButtonList`}>
            <ItemLi
              icon={faUsers}
              name="Administrateur de ville"
              path="/dashboard/adminCity/"
            >
              <ol>
                <ItemLi
                  icon={faLocationDot}
                  name="Point d'intérêts"
                  path="/dashboard/adminCity/adminCityPoi"
                ></ItemLi>
                <ItemLi
                  icon={faUser}
                  name="Utilisateurs"
                  path="/dashboard/adminCity/adminCityUsers"
                ></ItemLi>
                <ItemLi
                  icon={faUser}
                  name="Profils"
                  path="/dashboard/adminCity/profilAdminCity"
                ></ItemLi>
              </ol>
            </ItemLi>
          </li>
        </ul>
      </aside>
    </section>
  );
};

export default AsideMenu;
