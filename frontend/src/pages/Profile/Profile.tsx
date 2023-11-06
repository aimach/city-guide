import { useContext } from "react";
import { UsersContext } from "../../contexts/UserContext";
import style from "./profile.module.scss";

const Profile = () => {
  // get profile
  const { profile } = useContext(UsersContext);

  console.log(profile);

  return (
    <div className={style.profilePage}>
      <section>
        <div>
          {profile?.image !== null ? (
            <img src={profile?.image} alt="avatar" />
          ) : (
            profile?.username.substring(0, 1).toUpperCase()
          )}
          <p>name</p>
          <p>status</p>
        </div>
        <form>
          <div>
            <label htmlFor="city">Ville</label>
            <input type="text" name="city" id="city" />
          </div>
          <div>
            <label htmlFor="mail">Adresse mail</label>
            <input type="email" name="mail" id="mail" />
          </div>
          <div>
            <label htmlFor="password">Mot de passe</label>
            <input type="password" name="password" id="password" />
          </div>
          <div>
            <label htmlFor="bio">Bio</label>
            <input type="text" name="bio" id="bio" />
          </div>
        </form>
        <div>
          <button type="button">Suggérer un point d'intérêt</button>
          <button type="button">Supprimer le compte</button>
        </div>
      </section>
      <section>
        <h2>Mes favoris</h2>
        <div>
          <h3>Points d'intérêts favoris</h3>
        </div>
        <div>
          <h3>Villes favorites</h3>
        </div>
      </section>
    </div>
  );
};

export default Profile;
