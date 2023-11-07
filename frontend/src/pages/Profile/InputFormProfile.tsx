import style from "./profile.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faCheck } from "@fortawesome/free-solid-svg-icons";
import { User } from "../../utils/types";
import { IDisableInputs } from "./Profile";

interface Props {
  disableInputs: IDisableInputs;
  setDisableInputs: (arg0: IDisableInputs) => void;
  userInfo: User | null;
  setUserInfo: (arg0: User) => void;
  type: string;
  name: keyof User | keyof IDisableInputs;
  title: string;
  setDisplayModal: (arg0: boolean) => void;
}

const InputFormProfile = ({
  disableInputs,
  setDisableInputs,
  userInfo,
  setUserInfo,
  type,
  name,
  title,
  setDisplayModal,
}: Props) => {
  // resolve conflict between keyof User types and value attribute types
  let value: string | number | undefined;
  if (typeof userInfo?.[name as keyof User] === "string") {
    value = userInfo?.[name as keyof User]?.toString();
  }
  return (
    userInfo && (
      <div>
        <label htmlFor={name}>{title.toUpperCase()}</label>
        {disableInputs[name as keyof IDisableInputs] ? (
          <FontAwesomeIcon
            icon={faPen}
            className={style.icon}
            onClick={() =>
              setDisableInputs({ ...disableInputs, [name]: false })
            }
          />
        ) : (
          <FontAwesomeIcon
            icon={faCheck}
            className={style.icon}
            onClick={() => {
              setDisableInputs({ ...disableInputs, [name]: true });
              setDisplayModal(true);
            }}
          />
        )}
        <input
          type={type}
          name={name}
          id={name}
          value={value || ""}
          onChange={(event) => {
            if (userInfo !== null)
              setUserInfo({
                ...userInfo,
                [name]: event.target.value,
              });
          }}
          disabled={disableInputs[name as keyof IDisableInputs]}
        />
      </div>
    )
  );
};

export default InputFormProfile;
