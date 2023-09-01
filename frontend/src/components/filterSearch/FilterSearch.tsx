import styles from "./FilterSearch.module.scss";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface FilterSearchProps {
	filterSearch: string;
	setFilterSearch: (filterSearch: string) => void;
}

const FilterSearch = ({ filterSearch, setFilterSearch }: FilterSearchProps) => {
	return (
		<>
			<div className={`${styles.filter}`}>
				<span>
					<FontAwesomeIcon icon={faMagnifyingGlass} />
				</span>
				<input
					value={filterSearch}
					onChange={(event) => setFilterSearch(event.target.value)}
					type="text"
					name="FilterSearch"
					placeholder="Rechercher une ville..."
				/>
			</div>
		</>
	);
};

export default FilterSearch;
