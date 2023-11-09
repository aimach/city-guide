import { IDisplayModals } from "../../../pages/Profile/Profile";
import style from "./Modal.module.scss";
import { updateUserPassword } from "../../../utils/api";
import { useContext } from "react";
import { UsersContext } from "../../../contexts/UserContext";

interface Props {
  setDisplayModals: (arg0: IDisplayModals) => void;
  displayModals: IDisplayModals;
}

const PasswordModal = ({ setDisplayModals, displayModals }: Props) => {
  const { profile } = useContext(UsersContext);
  const hSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    // Or you can work with it as a plain object:
    const formJson = Object.fromEntries(formData.entries());
    if (profile !== null && profile !== undefined && profile.id !== null)
      updateUserPassword(profile.id, formJson);
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
