import style from "./profileMenuMobile.module.scss";
import { IoIosHeartEmpty } from "react-icons/io";
import { Link } from "react-router-dom";

export default function ProfileMenuMobile() {
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
        <Link to="">
          <p>Contact</p>
        </Link>
        <Link to="">
          <p>A propos</p>
        </Link>
      </div>
    </div>
  );
}
