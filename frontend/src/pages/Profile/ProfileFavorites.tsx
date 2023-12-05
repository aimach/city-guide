import style from "./profile.module.scss";
import { useContext } from "react";
import { UsersContext } from "../../contexts/UserContext";
import Caroussel from "../../components/common/Caroussel/Caroussel";
import { CardType } from "../../utils/types";
import { IoIosHeart } from "react-icons/io";

export default function ProfileFavorite() {
  const { profile } = useContext(UsersContext);

  return (
    <>
      <section className={style.favoritesSection}>
        <div>
          <IoIosHeart
            className={style.filledHeart}
            stroke="black"
            strokeWidth={22}
          />
        </div>
        <div>
          <h4 className="profilNameDark">Points d'intérêts</h4>
          {profile?.favouritePoi.length ? (
            <Caroussel
              title=""
              data={profile?.favouritePoi}
              cardType={CardType.POI}
            />
          ) : (
            <p>Pas de favori pour l'instant !</p>
          )}
        </div>
        <div>
          <h4 className="profilNameDark">Villes</h4>
          {profile?.favouriteCities.length ? (
            <Caroussel
              title=""
              data={profile?.favouriteCities}
              cardType={CardType.CITY}
            />
          ) : (
            <p>Pas de favori pour l'instant !</p>
          )}
        </div>
      </section>
      <img src="/fond_vague_creme.svg" alt="wave" width="100%" />
    </>
  );
}
