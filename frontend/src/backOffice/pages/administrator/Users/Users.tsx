import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import Title from "../../../components/common/Title/Title";
import BackOfficeLayout from "../../../components/layout/BackOfficeLayout";
import styles from "./Users.modules.scss";

const Users = () => {
	return (
		<>
			<BackOfficeLayout>
				<Title name={"Utilisateurs"} icon={faUserPlus}></Title>
				<p className={styles.bibi}>je suis dans la page utilisateurs</p>
			</BackOfficeLayout>
		</>
	);
};

export default Users;
