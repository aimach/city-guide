import { useContext, useEffect, useState } from "react";
import { UsersContext } from "../../contexts/UserContext";
import style from "./profile.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faCheck } from "@fortawesome/free-solid-svg-icons";
import { User } from "../../utils/types";
import InputFormProfile from "./InputFormProfile";
import Modal from "../../components/common/modals/Modal";

export interface IDisableInputs {
  city: boolean;
  email: boolean;
  password: boolean;
  username: boolean;
  bio: boolean;
}

export interface IDisplayModals {
  validation: boolean;
  image: boolean;
  deleteUser: boolean;
}

const Profile = () => {
  // get profile
  const { profile } = useContext(UsersContext);
  const [displayEditImg, setDisplayEditImg] = useState<boolean>(false);
  const [displayModals, setDisplayModals] = useState<IDisplayModals>({
    validation: false,
    image: false,
    deleteUser: false,
  });
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

  return (
    <div className={style.profilePage}>
      {displayModals.validation ? (
        <Modal
          setDisplayModals={setDisplayModals}
          displayModals={displayModals}
          type="validation"
        />
      ) : null}
      {displayModals.image ? (
        <Modal
          setDisplayModals={setDisplayModals}
          displayModals={displayModals}
          type="image"
        />
      ) : null}
      {displayModals.deleteUser ? (
        <Modal
          setDisplayModals={setDisplayModals}
          displayModals={displayModals}
          type="deleteUser"
        />
      ) : null}
      <section className={style.formSection}>
        <div className={style.profileAvatarAndName}>
          <div className={style.avatarImg}>
            {profile?.image !== null ? (
              <>
                <img
                  src={profile?.image}
                  alt="avatar"
                  className={displayEditImg ? style.imageOpacity : undefined}
                  onMouseOver={() => setDisplayEditImg(true)}
                  onMouseOut={() => setDisplayEditImg(false)}
                />
                {displayEditImg && (
                  <FontAwesomeIcon
                    icon={faPen}
                    className={style.iconEditImg}
                    onMouseOver={() => setDisplayEditImg(true)}
                    onClick={() =>
                      setDisplayModals({ ...displayModals, image: true })
                    }
                  />
                )}
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
              setDisplayModals={setDisplayModals}
              displayModals={displayModals}
            />
            <InputFormProfile
              disableInputs={disableInputs}
              setDisableInputs={setDisableInputs}
              userInfo={userInfo}
              setUserInfo={setUserInfo}
              type="text"
              name="email"
              title="adresse email"
              setDisplayModals={setDisplayModals}
              displayModals={displayModals}
            />
            <div>
              <label htmlFor="password">MOT DE PASSE</label>
              <input
                type="password"
                name="password"
                id="password"
                value="fakepassword"
                disabled={disableInputs.password}
              />
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
              setDisplayModals={setDisplayModals}
              displayModals={displayModals}
            />
            <div>
              <label htmlFor="bio">BIOGRAPHIE</label>
              <textarea
                name="bio"
                id="bio"
                value={profile?.bio || ""}
                disabled={disableInputs.bio}
              />
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
                  onClick={() => {
                    setDisableInputs({ ...disableInputs, bio: true });
                    setDisplayModals({ ...displayModals, validation: true });
                  }}
                />
              )}
            </div>
          </div>
        </form>
        <div className={style.buttonSection}>
          <button type="button">Suggérer un point d'intérêt</button>
          <button
            type="button"
            onClick={() =>
              setDisplayModals({ ...displayModals, deleteUser: true })
            }
          >
            Supprimer le compte
          </button>
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
      {/* <img src="/fond_vague_creme.svg" alt="wave" /> */}
    </div>
  );
};

export default Profile;
