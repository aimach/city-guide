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
  if (type === "image")
    modalContent = (
      <ImageModalContent
        setDisplayModals={setDisplayModals}
        displayModals={displayModals}
      />
    );
  if (type === "validation")
    modalContent = (
      <ValidationModalContent
        setDisplayModals={setDisplayModals}
        displayModals={displayModals}
      />
    );
  if (type === "delete")
    modalContent = (
      <DeleteUserModalContent
        setDisplayModals={setDisplayModals}
        displayModals={displayModals}
      />
    );
  return (
    <>
      <div className={style.backgroundScreen}></div>
      <div className={style.modalContainer}>{modalContent}</div>
    </>
  );
};

export default Modal;
