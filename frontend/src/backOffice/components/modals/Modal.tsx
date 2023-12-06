import styles from "./Modal.module.scss";

import { City } from "./../../../utils/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";

interface Props {
	city: City;
	onClose: () => void;
	// isOpen: string | null;
	isOpen: boolean;
	// isOpen: () => void;
}
const Modal = ({ city, onClose, isOpen }: Props) => {
	// const [cities, setCities] = useState<City[]>([]);
	const { id, name, coordinates, userAdminCity } = city;
	// const [inputValue, setInputValue] = useState("");

	// maj changement de valeur dans les input
	// const handleInputChange = (event: any) => {
	// 	console.log(event.target.value);
	// 	console.log(setInputValue(event.target.value));
	// 	setInputValue(event.target.value);
	// };

	// envoi des modifications
	// const handleSubmit = (event: any) => {
	// 	event.preventDefault();
	// 	console.log("Données soumises :", event, inputValue);
	// 	// requete fetch POST
	// };
	return (
		<>
			{isOpen && (
				<section className={styles.modalContainer}>
					<button onClick={onClose}>
						<FontAwesomeIcon icon={faXmark}></FontAwesomeIcon>
					</button>
					<p>{city.name}</p>
					{/* <form onSubmit={handleSubmit}>
					<label htmlFor="">Nom ville</label>
					<input
						type="text"
						value={city.name}
						// onChange={handleInputChange(city.name)}
						onChange={handleInputChange}
					/>
				</form>
				<button type="submit">Valider</button> */}
				</section>
			)}
		</>
	);
};
export default Modal;
