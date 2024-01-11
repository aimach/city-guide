import styles from "./ModalAdmin.module.scss";
import { City, Coordinates, User } from "../../../utils/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useRef } from "react";
import { updateCity, addCity } from "../../../utils/api";

export interface InputFormData {
  name: string;
  coordinates: number[];
  image: File[] | string;
  userAdminCity: string;
}

interface Props {
  city: City | InputFormData;
  onClose: () => void;
  isOpen: boolean;
  type: string;
  setDisplayModals: (displayModals: any) => void;
  displayModals: { validation: boolean; error: boolean };
}

// pour le cas ajouter un ville  si j'ouvre la modal je ne rempli pas le champ input

const ModalAdmin = ({
  city,
  onClose,
  isOpen,
  type,
  setDisplayModals,
  displayModals,
}: Props) => {
  // const { id, name, coordinates, userAdminCity } = city;
  const [inputFormData, setInputFormData] = useState<InputFormData>({
    name: city.name,
    coordinates:
      type === "modifyCity"
        ? (city.coordinates as Coordinates).coordinates
        : (city.coordinates as number[]),
    image: city.image,
    userAdminCity: city.userAdminCity
      ? (city.userAdminCity as User).username
      : "",
  });
  // console.log(" city.coordinates", city.coordinates);
  // ou objet vide si modal ajout ou modal prérempli si update

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

      // if type modify et que useRef === vide
      // dans le champ image je recupere l'info
    });

    // include image file in body
    console.log("inputRef.current ", inputRef);
    if (
      inputRef.current !== null &&
      inputRef.current.files &&
      inputRef.current.files[0] !== undefined
    ) {
      formData.append("image", inputRef.current.files[0]);
    }
    // else {
    // 	formData.append("image", inputFormData.image as string);
    // }

    // for (let pair of formData.entries()) {
    // 	console.log(pair[0] + ", " + pair[1]);
    // }
    // probleme sur les coordonnées dans le AddCity

    // Pour l'UPDATE si je ne modiife pas le fichier je garde l'image
    // je modifie le fichier je refais le formData pour la requete updateCity
    console.log("formData", [...formData.entries()]);

    type === "modifyCity"
      ? updateCity(formData, (city as City).id as string) //formData
      : // ? updateCity(inputFormData, (city as City).id as string) //formData
        // : addCity(inputFormData);
        addCity(formData);
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
              <label htmlFor="Nom ville">Nom ville</label>
              <input
                type="text"
                value={inputFormData.name}
                className={styles.inputModal}
                onChange={(event) =>
                  handleInputChange(event.target.value, "name")
                }
                name="name"
                // required
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
            {/* <div className={styles.simpleInput}>
							<label htmlFor="Image">Image</label>
							<input
								type="text"
								// value={city.image}
								value={inputFormData.image as string}
								className={styles.inputModal}
								onChange={(event) =>
									handleInputChange(event.target.value, "image")
								}
								name="image"
							/>
						</div> */}
            <div className={styles.simpleInput}>
              <label htmlFor="Image perso">Image</label>
              <input
                type="file"
                className={styles.inputModal}
                name="image"
                ref={inputRef} // ref sur l'input pour recuperer son contenu
                // onChange={(event) =>
                // 	handleInputChange(event.target.value, "image")
                // }
              />
            </div>
            <div className={styles.simpleInput}>
              <label htmlFor="Administrateur de ville">
                Administrateur de ville
              </label>
              <input
                type="text"
                value={inputFormData.userAdminCity}
                className={styles.inputModal}
                onChange={(event) =>
                  handleInputChange(event.target.value, "userAdminCity")
                }
                name="userAdminCity"
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
export default ModalAdmin;
