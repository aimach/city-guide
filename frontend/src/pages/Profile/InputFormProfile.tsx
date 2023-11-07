import style from "./profile.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faCheck } from "@fortawesome/free-solid-svg-icons";
import { User } from "../../utils/types";

interface Props {
  disableInputs: {
    [key: string]: boolean;
  };
  setDisableInputs: (arg0: { [key: string]: boolean }) => void;
  userInfo: User | null;
  setUserInfo: (arg0: User) => void;
}

const InputFormProfile = ({
  disableInputs,
  setDisableInputs,
  userInfo,
  setUserInfo,
}: Props) => {
  return (
    <div>
      <label htmlFor="city">VILLE</label>
      {disableInputs.city ? (
        <FontAwesomeIcon
          icon={faPen}
          className={style.icon}
          onClick={() => setDisableInputs({ ...disableInputs, city: false })}
        />
      ) : (
        <FontAwesomeIcon
          icon={faCheck}
          className={style.icon}
          onClick={() => setDisableInputs({ ...disableInputs, city: true })}
        />
      )}
      <input
        type="text"
        name="city"
        id="city"
        value={userInfo?.city || ""}
        onChange={(event) => {
          if (userInfo !== null)
            setUserInfo({ ...userInfo, city: event.target.value });
        }}
        disabled={disableInputs.city}
      />
    </div>
  );
};

export default InputFormProfile;
