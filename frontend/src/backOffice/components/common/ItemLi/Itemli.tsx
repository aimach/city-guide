import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import styles from "./ItemLi.module.scss";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { ReactNode } from "react";

type ItemLiProps = {
  icon: IconProp;
  path: string;
  name: string;
  children?: ReactNode;
};

const ItemLi = ({ icon, path, name, children }: ItemLiProps) => {
  return (
    <>
      <li className={`textButtonList`}>
        <Link to={path} className={styles.itemAsideMenu}>
          <span>
            <FontAwesomeIcon icon={icon} />
            {name}
          </span>
        </Link>
        {children}
      </li>
    </>
  );
};

export default ItemLi;
