import Dropdown from "../../components/filterSearch/dropdown/Dropdown";
import FilterSearch from "../../components/filterSearch/FilterSearch";
import styles from "./SearchPOI.module.scss";

const SearchPOI = () => {
	return (
		<div className={`${styles.mainSearchPOI}`}>
			<section className={`${styles.titleSearchPOI}`}>
				<h2 className={`titlePOI`}>Trouvez votre point d’intéret !</h2>
				<h3 className={`subtitlePOI`}>
					Laissez vous portez ! Nous allons vous faire découvrir des merveilles.
				</h3>
			</section>
			<FilterSearch />
			<section>
				<Dropdown></Dropdown>
				<Dropdown></Dropdown>
			</section>
			{/* <div className={`${styles.waveSearchPOI}`}></div> */}
		</div>
	);
};

export default SearchPOI;
