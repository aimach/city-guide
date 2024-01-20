import { faUser } from "@fortawesome/free-solid-svg-icons";
import Title from "../../../components/common/Title/Title";
import BackOfficeLayout from "../../../components/layout/BackOfficeLayout";
import styles from "./UsersCitiesAdmin.module.scss";

const UsersCitiesAdmin = () => {
	return (
		<>
			<BackOfficeLayout>
				<Title name={"Utilisateurs"} icon={faUser}></Title>
				<p className={styles.bibi}>
					je suis dans la page utilisateurs des administrateurs de villes
				</p>
			</BackOfficeLayout>
		</>
	);
};

export default UsersCitiesAdmin;
