import style from "./profileMenuMobile.module.scss";
import { IoIosHeartEmpty } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { UsersContext } from "../../contexts/UserContext";
import useWindowDimensions from "../../utils/hooks/useWindowDimensions";

export default function ProfileMenuMobile() {
  const { profile, logout } = useContext(UsersContext);
  const navigate = useNavigate();
  const windowSize = useWindowDimensions();

  useEffect(() => {
    if (profile === null) navigate("/auth/login");
    if (windowSize > 768) navigate("/profile/page");
  }, [profile, windowSize, navigate]);

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
        <Link to="/contact">Contact</Link>
        <Link to="">A propos</Link>
        <button
          onClick={() => {
            logout();
            navigate("/");
          }}
        >
          Se déconnecter
        </button>
      </div>
    </div>
  );
}
