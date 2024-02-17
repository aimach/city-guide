import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import styles from "./ItemLi.module.scss";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { ReactNode } from "react";

type ItemLiProps = {
  icon: IconProp;
  path: string;
  name: string;
  children?: ReactNode; // ? pas obligatoite, tous les composants ItemLi appelé dans AsideMenu ne sont pas obligé d'avoir des enfants
  // ReactNode car le PropsWithChildren ne fonctionnait pas on a trouvé le ReactNode en inspectant le PropsWithChildren
};

const ItemLi = ({ icon, path, name, children }: ItemLiProps) => {
  return (
    <>
      <li className={`textButtonList`}>
        <span className={styles.itemFlex}>
          <FontAwesomeIcon icon={icon} className={styles.spacingIconText} />
          {path !== "" ? (
            <Link to={path} className={styles.itemAsideMenu}>
              {name}
            </Link>
          ) : (
            <span className={styles.itemAsideMenu}>{name}</span>
          )}
        </span>
        {children}
      </li>
    </>
  );
};

export default ItemLi;
