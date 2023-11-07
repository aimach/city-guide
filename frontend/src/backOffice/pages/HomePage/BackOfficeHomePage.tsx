import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./BackOfficeHomePage.module.scss";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import BackOfficeLayout from "../../components/layout/BackOfficeLayout";

const HomePage = () => {
	return (
		<BackOfficeLayout>
			<div>
				<div className={styles.titleContainer}>
					<FontAwesomeIcon icon={faHouse} className={styles.iconSpaces} />
					<h3>Bienvennue sur le Dashboard Administrateur</h3>
				</div>
				{/* <p>
					Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatem
					aperiam maxime obcaecati laudantium eum quo exercitationem recusandae
					natus corrupti officia reiciendis suscipit voluptas eos dolorem
					maiores fugiat ratione nemo voluptate pariatur repellat laboriosam
					voluptatibus cumque et iure ad veniam in. Pariatur sit, accusantium.
				</p> */}
			</div>
		</BackOfficeLayout>
	);
};

export default HomePage;
