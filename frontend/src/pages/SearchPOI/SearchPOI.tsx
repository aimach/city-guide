import { Link } from "react-router-dom";
import FilterSearch from "../../components/filterSearch/FilterSearch";
import styles from "./SearchPOI.module.scss";
import { useState, useEffect } from "react";

const SearchPOI = () => {
	const [filterSearch, setFilterSearch] = useState("");
	const [totalCities, setTotalCities] = useState<any[]>([]);
	const [citiesToBeShown, setCitiesToBeShown] = useState<any[]>([]);

	const getCities = async () => {
		try {
			const response = await fetch(`http://localhost:5000/api/cities`);
			const data = await response.json();

			setTotalCities(data);
			setCitiesToBeShown(data);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		getCities();
	}, []);

	useEffect(() => {
		if (filterSearch) {
			setCitiesToBeShown(
				totalCities.filter((city) =>
					city.name.toLowerCase().startsWith(filterSearch.toLowerCase())
				)
			);
		} else {
			setCitiesToBeShown(totalCities);
		}
	}, [filterSearch, totalCities]);

	return (
		<>
			<div className={styles.mainSearchPOI}>
				<section className={styles.titleSearchPOI}>
					<h2 className={`titlePOI`}>Trouvez votre point d’intéret !</h2>
					<div className={styles.subtitlePOI}>
						<h3 className={`subtitlePOI`}>Laissez vous portez ! </h3>
						<h3 className={`subtitlePOI`}>
							Nous allons vous faire découvrir des merveilles.
						</h3>
					</div>
				</section>
				<div className={styles.filterSearchComponent}>
					<h3 className={`subtitlePoiCity`}>
						Choisis une ville et trouve ses points d'intérêt sur la carte
					</h3>
					<FilterSearch
						filterSearch={filterSearch}
						setFilterSearch={setFilterSearch}
					/>
					<Link
						className={`${styles.buttonSearchPoi} textButton`}
						to={`/carte?search=${filterSearch}`}
					>
						Voir la carte
					</Link>
				</div>
				<div className={styles.separatingBorder}></div>
				<section className={styles.filterSearchComponent}>
					<h3 className={styles.subtitleCity}>Villes</h3>
					{/* remplacer la balise li par le composant card */}
					<ul>
						{citiesToBeShown.map((city) => (
							<li key={city.id}>
								<img src={city.image} alt={city.name} width={150} height={50} />
								<span>{city.name}</span>
							</li>
						))}
					</ul>
					{citiesToBeShown.length === 0 && (
						<>
							<p className={`${styles.messageToCreatePOI} baseText`}>
								Cette ville n'a pas encore de point d'intérêt. Soyez le premier
								à poster un point d'intérêt !
							</p>
							<Link
								className={`${styles.buttonSearchPoi} textButton`}
								to={`/createPoi`}
							>
								Créer un point d'intérêt
							</Link>
						</>
					)}
				</section>
			</div>
			<div className={styles.WaveImage}></div>
		</>
	);
};

export default SearchPOI;
