import { IDisplayModals } from "../../../pages/Profile/Profile";
import style from "./Modal.module.scss";

interface Props {
  setDisplayModals: (arg0: IDisplayModals) => void;
  displayModals: IDisplayModals;
}

const PasswordModal = ({ setDisplayModals, displayModals }: Props) => {
  const hSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };
  return (
    <>
      <div className={style.backgroundScreen}></div>
      <div className={style.modalContainer}>
        <h3>Changer de mot de passe</h3>
        <form onSubmit={hSubmit} className={style.formPassword}>
          <div className={style.inputContainer}>
            <div>
              <label htmlFor="originalPassword">Mot de passe actuel</label>
              <input
                type="password"
                name="originalPassword"
                id="originalPassword"
              />
            </div>
            <div>
              <label htmlFor="newPassword">Nouveau mot de passe</label>
              <input type="password" name="newPassword" id="newPassword" />
            </div>
          </div>
          <div>
            <button type="submit">Valider</button>
            <button
              type="button"
              onClick={() =>
                setDisplayModals({ ...displayModals, password: false })
              }
            >
              Fermer
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default PasswordModal;
