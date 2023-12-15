import { faFolder } from "@fortawesome/free-solid-svg-icons";
import Title from "../../../components/common/Title/Title";
import BackOfficeLayout from "../../../components/layout/BackOfficeLayout";
import styles from "./Categories.module.scss";

const Categories = () => {
	return (
		<>
			<BackOfficeLayout>
				<Title name={"Catégories"} icon={faFolder}></Title>
				<p className={styles.bibi}>je suis dans la page des catégories</p>
			</BackOfficeLayout>
		</>
	);
};
export default Categories;
