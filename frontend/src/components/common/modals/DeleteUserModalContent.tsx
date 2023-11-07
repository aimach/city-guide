import { IDisplayModals } from "../../../pages/Profile/Profile";
interface Props {
  setDisplayModals: (arg0: IDisplayModals) => void;
  displayModals: IDisplayModals;
}

const DeleteUserModalContent = ({ setDisplayModals, displayModals }: Props) => {
  return (
    <>
      <h3>Êtes-vous sûr de vouloir supprimer votre compte ? </h3>
      <p>Cette action est irréversible !</p>

      <div>
        <button
          type="button"
          onClick={() =>
            setDisplayModals({ ...displayModals, deleteUser: false })
          }
        >
          Confirmer
        </button>
        <button
          type="button"
          onClick={() =>
            setDisplayModals({ ...displayModals, deleteUser: false })
          }
        >
          Fermer
        </button>
      </div>
    </>
  );
};

export default DeleteUserModalContent;
