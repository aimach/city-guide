import { useContext } from "react";
import { UsersContext } from "../../contexts/UserContext";
import style from "./profile.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
const Profile = () => {
  // get profile
  const { profile } = useContext(UsersContext);

  return (
    <div className={style.profilePage}>
      <section className={style.formSection}>
        <div className={style.profileAvatarAndName}>
          <div className={style.avatarImg}>
            {profile?.image !== null ? (
              <>
                <img src={profile?.image} alt="avatar" />
                <FontAwesomeIcon icon={faPen} className={style.icon} />
              </>
            ) : (
              profile?.username.substring(0, 1).toUpperCase()
            )}
          </div>
          <p>{profile?.username.toUpperCase()}</p>
          <p>{profile?.role}</p>
        </div>
        <form>
          <div className={style.formColumns}>
            {profile?.city ? (
              <div>
                <label htmlFor="city">VILLE</label>
                <FontAwesomeIcon icon={faPen} className={style.icon} />
                <input type="text" name="city" id="city" value={profile.city} />
              </div>
            ) : null}

            <div>
              <label htmlFor="mail">ADRESSE EMAIL</label>
              <FontAwesomeIcon icon={faPen} className={style.icon} />
              <input
                type="email"
                name="mail"
                id="mail"
                value={profile?.email}
              />
            </div>
            <div>
              <label htmlFor="password">MOT DE PASSE</label>
              <FontAwesomeIcon icon={faPen} className={style.icon} />
              <input type="password" name="password" id="password" />
            </div>
          </div>
          <div className={style.formColumns}>
            <div>
              <label htmlFor="bio">BIOGRAPHIE</label>
              <FontAwesomeIcon icon={faPen} className={style.icon} />
              <input type="text" name="bio" id="bio" />
            </div>
          </div>
        </form>
        <div className={style.buttonSection}>
          <button type="button">Suggérer un point d'intérêt</button>
          <button type="button">Supprimer le compte</button>
        </div>
      </section>
      <section className={style.favoritesSection}>
        <h2>Mes favoris</h2>
        <div>
          <h3>Points d'intérêts favoris</h3>
        </div>
        <div>
          <h3>Villes favorites</h3>
        </div>
      </section>
      <img src="/fond_vague_creme.svg" alt="wave" />
    </div>
  );
};

export default Profile;
