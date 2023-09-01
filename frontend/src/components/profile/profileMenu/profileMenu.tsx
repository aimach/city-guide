import { useContext } from "react";
import { UsersContext } from "../../../contexts/UserContext";
import style from "./profileMenu.module.scss";

const ProfileMenu = () => {
  const { profile } = useContext(UsersContext);

  return (
    <>
      <button className={`${style.avatarButton}`}>
        {profile?.image !== null ? (
          <img src={profile?.image} alt="avatar" />
        ) : (
          <p>{profile?.username.substring(0, 1).toUpperCase()}</p>
        )}
      </button>
      <div className={`${style.floatingMenu}`}> Menu de l'utilisateur</div>
    </>
  );
};

export default ProfileMenu;
