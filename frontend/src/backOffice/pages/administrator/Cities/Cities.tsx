import BackOfficeLayout from "../../../components/layout/BackOfficeLayout";
import styles from "./Cities.module.scss";
import { faCity, faPen, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import Title from "../../../components/common/Title/Title";
import { useEffect, useState } from "react";
import { City } from "../../../../utils/types";
import Checkbox from "../../../components/common/Checkbox/Checkbox";
import Button from "../../../components/common/Button/Button";
import Modal from "../../../components/modals/Modal";

const Cities = () => {
	const columns = [
		"Nom",
		"Coordonnées GPS",
		"Image",
		"Administrateur de ville",
	];

	const [cities, setCities] = useState<City[]>([]);
	const getCities = async () => {
		try {
			const response = await fetch("http://localhost:5000/api/cities", {});
			const data = await response.json();
			console.log("data", data);
			setCities(
				data.map((item: any) => {
					console.log("item", item);
					return item;
					// return {
					// 	...item,
					// };
				})
			);
		} catch (error) {
			console.log(error);
		}
	};
	useEffect(() => {
		getCities();
	}, []);

	const [checkedCities, setCheckedCities] = useState<City[]>([]);

	const handleSelectOrUnselectAll = () => {
		setCheckedCities(checkedCities.length === cities.length ? [] : cities);
	};

	const handleSelectOrUnselectOne = (city: City) => {
		const cityFoundInSelectedCities = checkedCities.find(
			(c) => c.id === city.id
		);

		if (cityFoundInSelectedCities) {
			setCheckedCities(
				checkedCities.filter((city) => city.id !== cityFoundInSelectedCities.id)
			);
		} else {
			setCheckedCities([...checkedCities, city]);
		}
	};
	// DELETE One City
	const handleDeleteOneCity = async (cityToDelete: City) => {
		try {
			await fetch(`http://localhost:5000/api/cities/${cityToDelete.id}`, {
				// a stocké dans le dotenv - on ne met pas l'utl localhost:5000
				method: "DELETE",
				credentials: "include",
				body: null,
			});
			const updatedCities = cities.filter(
				(city) => city.id !== cityToDelete.id
			);
			setCities(updatedCities);
		} catch (error) {
			console.log("delete error", error);
		}
	};

	//  UPDATE, Modify One City
	const [isModalOpen, setIsModalOpen] = useState<string | null>(null);

	const [cityToModified, setcityToModified] = useState<City | null>(null);

	const handleUpdateOneCity = (city: City) => {
		setcityToModified(city);
		setIsModalOpen(city.id);
	};
	const handleCloseModal = () => {
		setIsModalOpen(null);
	};

	return (
		<BackOfficeLayout>
			<Title icon={faCity} name={"Villes"}></Title>
			<h4 className={`${styles.subtitleTable} subtitleDashboard`}>
				Liste des villes
			</h4>
			<table>
				<thead>
					<tr>
						<th className={styles.startColumn}>
							<Checkbox
								value={checkedCities.length === cities.length}
								onChange={handleSelectOrUnselectAll}
							/>
						</th>

						{columns.map((column) => (
							<th
								key={column}
								className={`${styles.titleTable} fieldTableHead`}
							>
								{column}
							</th>
						))}
						<th className={`${styles.titleTable} fieldTableHead`}>Modifier</th>
						<th className={`${styles.titleTable} fieldTableHead`}>Supprimer</th>
					</tr>
				</thead>
				<tbody>
					{cities.map((city) => {
						return (
							<tr key={city.id}>
								<td className={styles.startColumn}>
									<Checkbox
										value={!!checkedCities.find((c) => c.id === city.id)}
										onChange={() => handleSelectOrUnselectOne(city)}
									/>
								</td>
								<td className={`fieldTableBody`}>{city.name}</td>
								<td className={`fieldTableBody`}>
									{city.coordinates.coordinates[0]}
									{city.coordinates.coordinates[1]}
								</td>
								<td className={`${styles.fieldImage} fieldTableBody`}>
									{city.image}
								</td>
								<td className={`fieldTableBody`}>
									{city.userAdminCity?.username}
								</td>
								<td className={styles.titleTable}>
									<Button
										icon={faPen}
										onClick={() => {
											handleUpdateOneCity(city);
										}}
									/>
								</td>
								<td className={styles.endColumn}>
									<Button
										icon={faTrashCan}
										onClick={() => handleDeleteOneCity(city)}
									/>
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>

			{isModalOpen && (
				<Modal
					onClose={handleCloseModal}
					isOpen={true}
					city={cityToModified as City}
				></Modal>
			)}
		</BackOfficeLayout>
	);
};

export default Cities;
