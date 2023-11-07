import style from "./Modal.module.scss";
interface Props {
  setDisplayValidationModal: (arg0: boolean) => void;
}

const ValidationModal = ({ setDisplayValidationModal }: Props) => {
  return (
    <>
      <div className={style.backgroundScreen}></div>
      <div className={style.modalContainer}>
        <h3>Modifications enregistrées !</h3>

        <button type="button" onClick={() => setDisplayValidationModal(false)}>
          Fermer
        </button>
      </div>
    </>
  );
};

export default ValidationModal;
