import styles from "./Modal.module.scss";

import { City } from "./../../../utils/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { updateCity } from "../../../utils/api";

interface Props {
	city: City;
	onClose: () => void;
	isOpen: boolean;
}

export interface IFormData {
	name: string;
	coordinates: number[];
	image: string;
	userAdminCity: string;
}
// pour le cas ajouter un ville  si j'ouvre la modal je ne rempli pas le champ input
// requete POST dans Cities.tsx

const Modal = ({ city, onClose, isOpen }: Props) => {
	const { id, name, coordinates, userAdminCity } = city;
	const [formData, setFormData] = useState<IFormData>({
		name: city.name,
		coordinates: city.coordinates.coordinates,
		image: city.image,
		userAdminCity: city.userAdminCity ? city.userAdminCity.username : "",
	});

	const handleInputChange = (value: any, key: string) => {
		if (key === "coordinates[0]") {
			setFormData({
				...formData,
				coordinates: [value, formData.coordinates[1]],
			});
		} else if (key === "coordinates[1]") {
			setFormData({
				...formData,
				coordinates: [formData.coordinates[0], value],
			});
		} else {
			setFormData({ ...formData, [key]: value });
		}
	};
	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		updateCity(formData, city.id as string);
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
								value={formData.name}
								className={styles.inputModal}
								onChange={(event) =>
									handleInputChange(event.target.value, "name")
								}
							/>
						</div>
						<label htmlFor="Coordonnées GPS">Coordonnées GPS</label>
						<div className={styles.doubleInput}>
							<div>
								<label htmlFor="Latitude">Latitude</label>
								<input
									type="text"
									value={formData.coordinates[0]}
									className={styles.inputModal}
									onChange={(event) =>
										handleInputChange(event.target.value, "coordinates[0]")
									}
								/>
							</div>
							<div>
								<label htmlFor="Longitude">Longitude</label>
								<input
									type="text"
									value={formData.coordinates[1]}
									className={styles.inputModal}
									onChange={(event) =>
										handleInputChange(event.target.value, "coordinates[1]")
									}
								/>
							</div>
						</div>
						<div className={styles.simpleInput}>
							<label htmlFor="Image">Image</label>
							<input
								type="text"
								// value={city.image}
								value={formData.image}
								className={styles.inputModal}
								onChange={(event) =>
									handleInputChange(event.target.value, "image")
								}
							/>
						</div>
						<div className={styles.simpleInput}>
							<label htmlFor="Administrateur de ville">
								Administrateur de ville
							</label>
							<input
								type="text"
								value={formData.userAdminCity}
								className={styles.inputModal}
								onChange={(event) =>
									handleInputChange(event.target.value, "userAdminCity")
								}
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
export default Modal;
