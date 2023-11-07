import { IDisplayModals } from "../../../pages/Profile/Profile";
interface Props {
  setDisplayModals: (arg0: IDisplayModals) => void;
  displayModals: IDisplayModals;
}

const ValidationModalContent = ({ setDisplayModals, displayModals }: Props) => {
  return (
    <>
      <h3>Modifications enregistrées !</h3>

      <button
        type="button"
        onClick={() =>
          setDisplayModals({ ...displayModals, validation: false })
        }
      >
        Fermer
      </button>
    </>
  );
};

export default ValidationModalContent;
