import { useContext } from "react";
import { UsersContext } from "../../../contexts/UserContext";
import style from "./profileMenu.module.scss";

const ProfileMenu = () => {
  const { profile } = useContext(UsersContext);

  return (
    <div className={`${style.avatarButton}`}>
      {profile?.image !== null ? (
        <img src={profile?.image} alt="avatar" />
      ) : (
        <p>{profile?.username.substring(0, 1).toUpperCase()}</p>
      )}
    </div>
  );
};

export default ProfileMenu;
