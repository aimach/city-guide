import style from "./Modal.module.scss";
interface Props {
  setDisplayImageModal: (arg0: boolean) => void;
}

const ImageModal = ({ setDisplayImageModal }: Props) => {
  return (
    <>
      <div className={style.backgroundScreen}></div>
      <div className={style.modalContainer}>
        <h3>Changer d'avatar</h3>
        <input type="file" name="avatar" id="avatar" />
        <div>
          <button type="button" onClick={() => setDisplayImageModal(false)}>
            Valider
          </button>
          <button type="button" onClick={() => setDisplayImageModal(false)}>
            Fermer
          </button>
        </div>
      </div>
    </>
  );
};

export default ImageModal;
