import { useNavigate } from "react-router-dom";
import { IDisplayModals } from "../../../pages/Profile/Profile";
import DeleteUserModalContent from "./DeleteUserModalContent";
import style from "./Modal.module.scss";
import ValidationModalContent from "./ValidationModalContent";
import { deleteUser } from "../../../utils/api";
import { useContext } from "react";
import { UsersContext } from "../../../contexts/UserContext";
interface Props {
  setDisplayModals: (arg0: IDisplayModals) => void;
  displayModals: IDisplayModals;
  type: string;
}

const Modal = ({ setDisplayModals, displayModals, type }: Props) => {
  let modalContent;

  if (type === "validation") modalContent = <ValidationModalContent />;
  if (type === "deleteUser") modalContent = <DeleteUserModalContent />;

  const navigate = useNavigate();
  const { profile } = useContext(UsersContext);

  return (
    <>
      <div className={style.backgroundScreen}></div>
      <div className={style.modalContainer}>
        {modalContent}
        <div>
          {type !== "validation" ? (
            <button
              type="button"
              onClick={() => {
                setDisplayModals({ ...displayModals, [type]: false });
                if (
                  type === "deleteUser" &&
                  profile !== null &&
                  profile.id !== null
                ) {
                  deleteUser(profile.id);
                  navigate("/");
                }
              }}
            >
              Valider
            </button>
          ) : null}
          <button
            type="button"
            onClick={() => {
              setDisplayModals({ ...displayModals, [type]: false });
              navigate(0);
            }}
          >
            Fermer
          </button>
        </div>
      </div>
    </>
  );
};

export default Modal;
