import { faUser } from "@fortawesome/free-solid-svg-icons";
import BackOfficeLayout from "../../../components/layout/BackOfficeLayout";
import styles from "./Profil.module.scss";
import Title from "../../../components/common/Title";

const Profil = () => {
	return (
		<>
			<BackOfficeLayout>
				<Title name={"Profil"} icon={faUser}></Title>
				<p className={styles.bibi}>je suis dans la page profil</p>
			</BackOfficeLayout>
		</>
	);
};
export default Profil;
