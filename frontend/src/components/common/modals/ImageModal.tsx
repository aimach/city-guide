import { useRef, useContext } from "react";
import { IDisplayModals } from "../../../pages/Profile/Profile";
import style from "./Modal.module.scss";
import { User } from "../../../utils/types";
import { updateUserExceptPassword } from "../../../utils/api";
import { UsersContext } from "../../../contexts/UserContext";
interface Props {
  setDisplayModals: (arg0: IDisplayModals) => void;
  displayModals: IDisplayModals;
  userInfo: User | null;
}

const ImageModal = ({ setDisplayModals, displayModals, userInfo }: Props) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const formData = new FormData();
  const { checkUserSession } = useContext(UsersContext);

  const hSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (inputRef.current !== null && inputRef.current.files) {
      formData.append("image", inputRef.current.files[0]);
    }
    if (userInfo !== null) {
      const keysForUpdate: string[] = [
        "bio",
        "city",
        "email",
        "id",
        "username",
        "role",
      ];
      Object.keys(userInfo).forEach((key) => {
        if (keysForUpdate.includes(key as keyof User))
          formData.append(key, userInfo[key as keyof User] as string);
      });
    }
    setDisplayModals({ ...displayModals, image: false });

    if (userInfo !== null && userInfo.id !== null) {
      await updateUserExceptPassword(userInfo.id, formData);
      checkUserSession();
    }
  };
  return (
    <>
      <div className={style.backgroundScreen}></div>
      <div className={style.modalContainer}>
        <h3>Changer d'avatar</h3>
        <form encType="multipart/form-data" onSubmit={hSubmit}>
          <input
            type="file"
            name="image"
            id="image"
            accept="image/png, image/jpeg"
            ref={inputRef}
          />
          <div>
            <button type="submit">Valider</button>
            <button
              type="button"
              onClick={() =>
                setDisplayModals({ ...displayModals, image: false })
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

export default ImageModal;
