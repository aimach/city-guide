import Dropdown from "../../Components/filterSearch/dropdown/Dropdown";
import styles from "./SearchPOI.module.scss";

const SearchPOI = () => {
	return (
		<div className={`${styles.mainSearchPOI}`}>
			<section>
				<h2 className={`titlePOI`}>Trouvez votre point d’intéret !</h2>
				<h3 className={`subtitlePOI`}>
					Laissez vous portez ! Nous allons vous faire découvrir des merveilles
				</h3>
				<p>SearchPOI</p>
				<Dropdown></Dropdown>
			</section>
		</div>
	);
};

export default SearchPOI;
