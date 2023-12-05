import style from "./profileMenuMobile.module.scss";
import { IoIosHeartEmpty } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { UsersContext } from "../../contexts/UserContext";

export default function ProfileMenuMobile() {
  const { profile, logout } = useContext(UsersContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (profile === null) navigate("/auth/login");
  }, []);

  return (
    <div className={`${style.menuContainer} logoHeader`}>
      <div className={`${style.buttonContainer}`}>
        <Link to="/profile/page">
          <button type="button">Profil</button>
        </Link>
        <Link to="/profile/favorites">
          <button type="button">
            Favoris
            <IoIosHeartEmpty
              className={style.filledHeart}
              stroke="black"
              strokeWidth={22}
            />
          </button>
        </Link>
      </div>
      <div className={style.linkContainer}>
        <Link to="">Contact</Link>
        <Link to="">A propos</Link>
        <Link to="">
          {" "}
          <button
            onClick={() => {
              logout();
              navigate("/");
            }}
          >
            Se déconnecter
          </button>
        </Link>
      </div>
    </div>
  );
}
