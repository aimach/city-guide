import { useContext, useEffect, useState } from "react";
import { UsersContext } from "../../contexts/UserContext";
import style from "./profile.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faCheck } from "@fortawesome/free-solid-svg-icons";
import { User } from "../../utils/types";
import InputFormProfile from "./InputFormProfile";

const Profile = () => {
  // get profile
  const { profile } = useContext(UsersContext);
  const [userInfo, setUserInfo] = useState<User | null>(null);
  const [disableInputs, setDisableInputs] = useState<{
    city: boolean;
    email: boolean;
    password: boolean;
    bio: boolean;
  }>({
    city: true,
    email: true,
    password: true,
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
            />

            <div>
              <label htmlFor="mail">ADRESSE EMAIL</label>
              {disableInputs.email ? (
                <FontAwesomeIcon
                  icon={faPen}
                  className={style.icon}
                  onClick={() =>
                    setDisableInputs({ ...disableInputs, email: false })
                  }
                />
              ) : (
                <FontAwesomeIcon
                  icon={faCheck}
                  className={style.icon}
                  onClick={() =>
                    setDisableInputs({ ...disableInputs, email: true })
                  }
                />
              )}

              <input
                type="email"
                name="mail"
                id="mail"
                value={userInfo?.email}
                onChange={(event) => {
                  if (userInfo !== null)
                    setUserInfo({ ...userInfo, email: event.target.value });
                }}
                disabled={disableInputs.email}
              />
            </div>
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
                disabled={disableInputs.password}
              />
            </div>
          </div>
          <div className={style.formColumns}>
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
