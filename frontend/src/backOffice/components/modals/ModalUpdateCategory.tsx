import styles from "./ModalAdmin.module.scss";
import { Category } from "../../../utils/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useRef } from "react";
import { updateCategory, addCategory } from "../../../utils/api";

export interface InputFormData {
  name: string;
  image: File[] | string;
}

interface Props {
  category: Category | InputFormData;
  onClose: () => void;
  isOpen: boolean;
  type: string;
  setDisplayModals: (displayModals: any) => void;
  displayModals: { validation: boolean; error: boolean };
}

const ModalUpdateCategory = ({
  category,
  onClose,
  isOpen,
  type,
  setDisplayModals,
  displayModals,
}: Props) => {
  const [inputFormData, setInputFormData] = useState<InputFormData>({
    name: category.name,
    image: category.image,
  });

  const handleInputChange = (value: any, key: string) => {
    setInputFormData({ ...inputFormData, [key]: value });
  };
  const inputRef = useRef<HTMLInputElement | null>(null);
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData();

    Object.keys(inputFormData).forEach((key) => {
      if (key !== "image") {
        formData.append(
          key,
          inputFormData[key as keyof InputFormData] as string
        );
      }
    });

    // include image file in body
    if (
      inputRef.current !== null &&
      inputRef.current.files &&
      inputRef.current.files[0] !== undefined
    ) {
      formData.append("image", inputRef.current.files[0]);
    }
    type === "modifyCategory"
      ? updateCategory(formData, (category as Category).id as string)
      : addCategory(formData);
    setDisplayModals({ ...displayModals, validation: true });
  };

  return (
    <>
      {isOpen && (
        <section className={styles.modalContainer}>
          <button onClick={onClose} className={styles.closeButton}>
            <FontAwesomeIcon icon={faXmark}></FontAwesomeIcon>
          </button>
          <form onSubmit={handleSubmit}>
            <div className={styles.simpleInput}>
              <label htmlFor="Nom ville">Nom de la catégorie</label>
              <input
                type="text"
                value={inputFormData.name}
                className={styles.inputModal}
                onChange={(event) =>
                  handleInputChange(event.target.value, "name")
                }
                name="name"
              />
            </div>
            <div className={styles.simpleInput}>
              <label htmlFor="image">Image</label>
              <input
                type="file"
                className={styles.inputModal}
                name="image"
                ref={inputRef}
              />
            </div>
            <button type="submit" className={styles.buttonModal}>
              Valider
            </button>
          </form>
        </section>
      )}
    </>
  );
};
export default ModalUpdateCategory;
