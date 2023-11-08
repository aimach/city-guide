import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import Title from "../../../components/common/Title";
import BackOfficeLayout from "../../../components/layout/BackOfficeLayout";
import styles from "./Poi.module.scss";

const Poi = () => {
	return (
		<>
			<BackOfficeLayout>
				<Title name={"Point d'intérêts"} icon={faLocationDot}></Title>
				<p className={styles.bibi}>je suis dans la page Poi</p>
			</BackOfficeLayout>
		</>
	);
};
export default Poi;
