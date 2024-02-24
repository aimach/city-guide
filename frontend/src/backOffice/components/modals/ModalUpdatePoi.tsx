import styles from "./ModalAdmin.module.scss";
import { Poi, Coordinates, City } from "../../../utils/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useRef } from "react";
import { updatePoi, addPoi } from "../../../utils/api";

export interface InputFormData {
  name: string;
  coordinates: number[];
  description: string;
  address: string;
  phoneNumber: string;
  image: File[] | string;
  isAccepted: boolean;
  city: string;
}

interface Props {
  poi: Poi | InputFormData;
  onClose: () => void;
  isOpen: boolean;
  type: string;
  setDisplayModals: (displayModals: any) => void;
  displayModals: { validation: boolean; error: boolean };
}

const ModalUpdatePoi = ({
  poi,
  onClose,
  isOpen,
  type,
  setDisplayModals,
  displayModals,
}: Props) => {
  const [inputFormData, setInputFormData] = useState<InputFormData>({
    name: poi.name,
    coordinates:
      type === "modifyPoi"
        ? (poi.coordinates as Coordinates).coordinates
        : (poi.coordinates as number[]),
    description: poi.description,
    address: poi.address,
    phoneNumber: poi.phoneNumber as string,
    image: poi.image,
    isAccepted: poi.isAccepted as boolean,
    city: (poi.city as City).id as string,
  });

  const handleInputChange = (value: any, key: string) => {
    if (key === "coordinates[0]") {
      setInputFormData({
        ...inputFormData,
        coordinates: [value, inputFormData.coordinates[1]],
      });
    } else if (key === "coordinates[1]") {
      setInputFormData({
        ...inputFormData,
        coordinates: [inputFormData.coordinates[0], value],
      });
    } else {
      setInputFormData({ ...inputFormData, [key]: value });
    }
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
    type === "modifyPoi"
      ? updatePoi(formData, (poi as Poi).id as string)
      : addPoi(formData);
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
              <label htmlFor="Nom ville">Nom du POI</label>
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
            <label htmlFor="Coordonnées GPS">Coordonnées GPS</label>
            <div className={styles.doubleInput}>
              <div>
                <label htmlFor="Latitude">Latitude</label>
                <input
                  type="text"
                  value={inputFormData.coordinates[0]}
                  className={styles.inputModal}
                  onChange={(event) =>
                    handleInputChange(event.target.value, "coordinates[0]")
                  }
                  name="coordinates"
                />
              </div>
              <div>
                <label htmlFor="Longitude">Longitude</label>
                <input
                  type="text"
                  value={inputFormData.coordinates[1]}
                  className={styles.inputModal}
                  onChange={(event) =>
                    handleInputChange(event.target.value, "coordinates[1]")
                  }
                  name="coordinates"
                />
              </div>
            </div>
            <div className={styles.simpleInput}>
              <label htmlFor="Nom ville">Adresse</label>
              <input
                type="text"
                value={inputFormData.address}
                className={styles.inputModal}
                onChange={(event) =>
                  handleInputChange(event.target.value, "address")
                }
                name="address"
              />
            </div>
            <div className={styles.simpleInput}>
              <label htmlFor="Nom ville">N° de téléphone</label>
              <input
                type="text"
                value={inputFormData.phoneNumber}
                className={styles.inputModal}
                onChange={(event) =>
                  handleInputChange(event.target.value, "phoneNumber")
                }
                name="phoneNumber"
              />
            </div>
            <div className={styles.simpleInput}>
              <label htmlFor="Nom ville">Description</label>
              <input
                type="text"
                value={inputFormData.description}
                className={styles.inputModal}
                onChange={(event) =>
                  handleInputChange(event.target.value, "description")
                }
                name="description"
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
            <div className={styles.simpleInput}>
              <label htmlFor="image">Validé</label>
              <input
                type="checkbox"
                value={inputFormData.isAccepted ? "true" : "false"}
                className={styles.inputModal}
                onChange={(event) =>
                  handleInputChange(event.target.value, "isAccepted")
                }
                name="isAccepted"
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
export default ModalUpdatePoi;
