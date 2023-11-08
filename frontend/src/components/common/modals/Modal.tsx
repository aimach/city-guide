import { IDisplayModals } from "../../../pages/Profile/Profile";
import DeleteUserModalContent from "./DeleteUserModalContent";
import ImageModalContent from "./ImageModalContent";
import style from "./Modal.module.scss";
import ValidationModalContent from "./ValidationModalContent";
interface Props {
  setDisplayModals: (arg0: IDisplayModals) => void;
  displayModals: IDisplayModals;
  type: string;
}

const Modal = ({ setDisplayModals, displayModals, type }: Props) => {
  let modalContent;
  if (type === "image") modalContent = <ImageModalContent />;
  if (type === "validation") modalContent = <ValidationModalContent />;
  if (type === "deleteUser") modalContent = <DeleteUserModalContent />;
  return (
    <>
      <div className={style.backgroundScreen}></div>
      <div className={style.modalContainer}>
        {modalContent}
        <div>
          {type !== "validation" ? (
            <button
              type="button"
              onClick={() =>
                setDisplayModals({ ...displayModals, [type]: false })
              }
            >
              Valider
            </button>
          ) : null}
          <button
            type="button"
            onClick={() =>
              setDisplayModals({ ...displayModals, [type]: false })
            }
          >
            Fermer
          </button>
        </div>
      </div>
    </>
  );
};

export default Modal;
