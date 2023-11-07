import { useContext, useEffect, useState } from "react";
import { UsersContext } from "../../contexts/UserContext";
import style from "./profile.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faCheck } from "@fortawesome/free-solid-svg-icons";
import { User } from "../../utils/types";
import InputFormProfile from "./InputFormProfile";

export interface IDisableInputs {
  city: boolean;
  email: boolean;
  password: boolean;
  username: boolean;
  bio: boolean;
}

const Profile = () => {
  // get profile
  const { profile } = useContext(UsersContext);
  const [userInfo, setUserInfo] = useState<User | null>(null);
  const [disableInputs, setDisableInputs] = useState<IDisableInputs>({
    city: true,
    email: true,
    password: true,
    username: true,
    bio: true,
  });

  useEffect(() => {
    if (profile !== null) setUserInfo(profile);
  }, [profile]);

  console.log(userInfo);

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
            <InputFormProfile
              disableInputs={disableInputs}
              setDisableInputs={setDisableInputs}
              userInfo={userInfo}
              setUserInfo={setUserInfo}
              type="text"
              name="city"
              title="ville"
            />
            <InputFormProfile
              disableInputs={disableInputs}
              setDisableInputs={setDisableInputs}
              userInfo={userInfo}
              setUserInfo={setUserInfo}
              type="text"
              name="email"
              title="adresse email"
            />
            <div>
              <label htmlFor="password">MOT DE PASSE</label>
              {disableInputs.password ? (
                <FontAwesomeIcon
                  icon={faPen}
                  className={style.icon}
                  onClick={() =>
                    setDisableInputs({ ...disableInputs, password: false })
                  }
                />
              ) : (
                <FontAwesomeIcon
                  icon={faCheck}
                  className={style.icon}
                  onClick={() =>
                    setDisableInputs({ ...disableInputs, password: true })
                  }
                />
              )}
              <input
                type="password"
                name="password"
                id="password"
                value="fakepassword"
                disabled={disableInputs.password}
              />
            </div>
          </div>
          <div className={style.formColumns}>
            <InputFormProfile
              disableInputs={disableInputs}
              setDisableInputs={setDisableInputs}
              userInfo={userInfo}
              setUserInfo={setUserInfo}
              type="text"
              name="username"
              title="pseudo"
            />
            <div>
              <label htmlFor="bio">BIOGRAPHIE</label>
              {disableInputs.bio ? (
                <FontAwesomeIcon
                  icon={faPen}
                  className={style.icon}
                  onClick={() =>
                    setDisableInputs({ ...disableInputs, bio: false })
                  }
                />
              ) : (
                <FontAwesomeIcon
                  icon={faCheck}
                  className={style.icon}
                  onClick={() =>
                    setDisableInputs({ ...disableInputs, bio: true })
                  }
                />
              )}

              <input
                type="text"
                name="bio"
                id="bio"
                disabled={disableInputs.password}
              />
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
