import FilterSearch from "../../components/filterSearch/FilterSearch";
import styles from "./SearchPOI.module.scss";
import { useState, useEffect } from "react";

const SearchPOI = () => {
	// filterSearch -> valeur qui est contrôlée par React.
	// 								 Dès qu'on la met à jour, React met à jour le composant qui l'utilise.
	// setFilterSearch -> fonction qui met à jour la valeur contrôlée par React.
	const [filterSearch, setFilterSearch] = useState("");
	const [totalCities, setTotalCities] = useState<any[]>([]);
	const [citiesToBeShown, setCitiesToBeShown] = useState<any[]>([]);

	/*
            Solution idéale : faire le filtrage coté back en utilisant postgres et typeorm
			Au premier chargement du composant, on charge des villes possibles.
			À chaque changement du filterSearch,
				on réappelle le backend avec le filtre de recherche, et on met à jour la liste des villes
					(GET /cities?search=par)
	*/

	const getCities = async () => {
		try {
			const response = await fetch(`http://localhost:5000/api/cities`);
			const data = await response.json();

			// On sauvegarde toutes les villes dans le state.
			setTotalCities(data);

			// On sauvegarde les villes à afficher dans un autre state.
			setCitiesToBeShown(data);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		getCities();

		// Le fait d'ajotuer un tableau de dépendances vide en 2ème paramètre du useEffect,
		// permet d'exécuter une seule fois le code au dessus
	}, []);

	// On utilise useEffect pour actionner un comportement, à chaque mise à jour de la valeur filterSearch.
	useEffect(() => {
		// On ajoute un comportement ici.

		// On filtre les villes totales, et on met le résultat dans cities to be shown.
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
				<div className={styles.contentSearchPOI}>
					<section className={styles.titleSearchPOI}>
						<h2 className={`titlePOI`}>Trouvez votre point d’intéret !</h2>
						<div className={`${styles.subtitlePOI} subtitlePOI`}>
							<h3>Laissez vous portez ! </h3>
							<h3>Nous allons vous faire découvrir des merveilles.</h3>
						</div>
					</section>
					<div className={styles.filterSearchComponent}>
						<h3 className={`subtitlePOI`}>
							Choisis une ville et trouve ses points d'intérêt.
						</h3>
						<FilterSearch
							filterSearch={filterSearch}
							setFilterSearch={setFilterSearch}
						/>
						<section>
							<h3 className={`${styles.subtitleCity} subtitleCity`}>Villes</h3>
							<ul>
								{citiesToBeShown.map((city) => (
									<li key={city.id}>
										<img
											src={city.image}
											alt={city.name}
											width={150}
											height={50}
										/>
										<span>{city.name}</span>
									</li>
								))}
							</ul>
						</section>
					</div>
				</div>
			</div>
		</>
	);
};

export default SearchPOI;
