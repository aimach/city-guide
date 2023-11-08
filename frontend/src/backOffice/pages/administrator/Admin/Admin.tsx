import styles from "./Admin.module.scss";
import Title from "../../../components/common/Title";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import BackOfficeLayout from "../../../components/layout/BackOfficeLayout";

const Admin = () => {
	return (
		<>
			<BackOfficeLayout>
				<Title name={"Administrateur"} icon={faUser}></Title>
				<p className={styles.bibi}>je suis dans la page admin</p>
			</BackOfficeLayout>
		</>
	);
};

export default Admin;
