import { IDisplayModals } from "../../../pages/Profile/Profile";
interface Props {
  setDisplayModals: (arg0: IDisplayModals) => void;
  displayModals: IDisplayModals;
}
const ImageModalContent = ({ setDisplayModals, displayModals }: Props) => {
  return (
    <>
      <h3>Changer d'avatar</h3>
      <input type="file" name="avatar" id="avatar" />
      <div>
        <button
          type="button"
          onClick={() => setDisplayModals({ ...displayModals, image: false })}
        >
          Valider
        </button>
        <button
          type="button"
          onClick={() => setDisplayModals({ ...displayModals, image: false })}
        >
          Fermer
        </button>
      </div>
    </>
  );
};

export default ImageModalContent;
