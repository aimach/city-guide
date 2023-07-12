import style from "./headerMobile.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMap,
  faMagnifyingGlass,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

const HeaderMobile = () => {
  return (
    <header className={`${style.headerMobile}`}>
      <nav>
        <FontAwesomeIcon icon={faMap} className={`${style.iconStyle}`} />
        <FontAwesomeIcon
          icon={faMagnifyingGlass}
          className={`${style.iconStyle}`}
        />
        <FontAwesomeIcon icon={faUser} className={`${style.iconStyle}`} />
      </nav>
    </header>
  );
};

export default HeaderMobile;
