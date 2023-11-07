import style from "./Modal.module.scss";
interface Props {
  setDisplayModal: (arg0: boolean) => void;
}

const ValidationModal = ({ setDisplayModal }: Props) => {
  return (
    <>
      <div className={style.backgroundScreen}></div>
      <div className={style.modalContainer}>
        <h3>Modifications enregistrées !</h3>
        <button type="button" onClick={() => setDisplayModal(false)}>
          Fermer
        </button>
      </div>
    </>
  );
};

export default ValidationModal;
