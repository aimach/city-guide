import { IDisplayModals } from "../../../pages/Profile/Profile";
import style from "./Modal.module.scss";
import { updateUserPassword } from "../../../utils/api";
import { useContext, useState } from "react";
import { UsersContext } from "../../../contexts/UserContext";

interface Props {
  setDisplayModals: (arg0: IDisplayModals) => void;
  displayModals: IDisplayModals;
}

const PasswordModal = ({ setDisplayModals, displayModals }: Props) => {
  const { profile } = useContext(UsersContext);
  const [errorMsg, setErrorMsg] = useState<{
    [key: string]: { message: string; status: boolean };
  }>({
    originalPassword: { message: "", status: false },
    newPassword: { message: "", status: false },
  });
  const hSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    // Or you can work with it as a plain object:
    const formJson = Object.fromEntries(formData.entries());

    if (profile !== null && profile !== undefined && profile.id !== null) {
      const update = await updateUserPassword(profile.id, formJson);
      if (update !== undefined && update.error) {
        update.key === "originalPassword"
          ? setErrorMsg({
              originalPassword: { message: update.error, status: true },
              newPassword: { message: "", status: false },
            })
          : setErrorMsg({
              originalPassword: { message: "", status: false },
              newPassword: { message: update.error, status: true },
            });
      } else {
        setDisplayModals({ ...displayModals, password: false });
      }
    }
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
              {errorMsg.originalPassword ? (
                <p className={style.error}>
                  {errorMsg.originalPassword.message}
                </p>
              ) : null}
            </div>
            <div>
              <label htmlFor="newPassword">Nouveau mot de passe</label>
              <input type="password" name="newPassword" id="newPassword" />
              {errorMsg.newPassword ? (
                <p className={style.error}>{errorMsg.newPassword.message}</p>
              ) : null}
            </div>
          </div>
          <div>
            <button type="submit">Valider</button>
            <button
              type="button"
              onClick={() => {
                setDisplayModals({ ...displayModals, password: false });
              }}
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
