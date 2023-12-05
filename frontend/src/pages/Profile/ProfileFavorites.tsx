import style from "./profile.module.scss";
import { useContext, useState } from "react";
import { UsersContext } from "../../contexts/UserContext";
import Caroussel from "../../components/common/Caroussel/Caroussel";
import { CardType } from "../../utils/types";
import { IoIosHeart } from "react-icons/io";

export default function ProfileFavorite() {
  const { profile } = useContext(UsersContext);
  const [favType, setFavType] = useState("poi");

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
        <div className={style.buttonContainer}>
          <button
            type="button"
            onClick={() => setFavType("poi")}
            className={favType === "poi" ? style.buttonSelected : undefined}
          >
            Points d'intérêts
          </button>
          <button
            type="button"
            onClick={() => setFavType("city")}
            className={favType === "city" ? style.buttonSelected : undefined}
          >
            Villes
          </button>
        </div>
        {favType === "poi" ? (
          <div>
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
        ) : (
          <div>
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
        )}
      </section>
      <img src="/fond_vague_creme.svg" alt="wave" width="100%" />
    </>
  );
}
