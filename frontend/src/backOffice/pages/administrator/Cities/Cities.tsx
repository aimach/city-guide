import BackOfficeLayout from "../../../components/layout/BackOfficeLayout";
import styles from "./Cities.module.scss";
import { faCity } from "@fortawesome/free-solid-svg-icons";
import Title from "../../../components/common/Title";

const Cities = () => {
	return (
		<BackOfficeLayout>
			<Title icon={faCity} name={"Villes"}></Title>
			<h4>Liste des administrateurs de villes</h4>
			<p className={styles.titleMessage}>je suis dans la page ville</p>

			<table>
				<thead>
					<tr>
						<th>Nom</th>
					</tr>
					<tr>
						<th>Coordonnées GPS</th>
					</tr>
					<tr>
						<th>Image</th>
					</tr>
					<tr>
						<th>Administrateur de ville</th>
					</tr>
					<tr>
						<th>....</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>Marseille</td>
						<td>bibi</td>
						<td>bibi</td>
						<td>User01</td>
						<td>
							<button>edit</button>
							<button>delete</button>
						</td>
					</tr>
				</tbody>
			</table>
		</BackOfficeLayout>
	);
};

export default Cities;
