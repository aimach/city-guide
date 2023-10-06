import { UsersContext, UserProvider } from "../../contexts/UserContext";
import { useNavigate, useSearchParams } from "react-router-dom";
import InteractiveMap from "../../components/interactiveMap/InteractiveMap";
import { useContext, useEffect, useState } from "react";
import SearchPOI from "../SearchPOI/SearchPOI";
import style from "./homePage.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

const HomePage = () => {
	const [windowSize, setWindowSize] = useState<number>(window.innerWidth);

	function updateDimension() {
		setWindowSize(window.innerWidth);
	}

	useEffect(() => {
		window.addEventListener("resize", updateDimension);
	}, [windowSize]);

	const navigate = useNavigate();
	const { isAuthenticated, logout, redirectToLogin } = useContext(UsersContext);
	// On vérifie si l'utilisateur est connecté.

	const [searchParams] = useSearchParams();

	/* a deplacer dans la page de la carte 
	const { search } = Object.fromEntries([...searchParams]);
	console.log("search", search);
    */

	return (
		<UserProvider>
			<div>
				{windowSize > 768 ? (
					<>
						<section className={`${style.backgroundWave}`}>
							<div className={`presentationText ${style.presentationSection} `}>
								<p>
									Lorem ipsum dolor sit amet, consectetur adipisicing elit.
									Illum blanditiis aperiam ad, aspernatur incidunt voluptatem ea
									molestias nemo rem ratione nesciunt neque corporis nihil
									recusandae cum minima. Id, voluptatum tenetur?
								</p>
								<button
									className={`buttonHomePage textButton ${style.presentationButton}`}
								>
									<FontAwesomeIcon icon={faPaperPlane} />
									Explorez
								</button>
							</div>
						</section>
						<section>
							<div className={`${style.mapSection}`}>
								<InteractiveMap />
							</div>
							<div className={`${style.pictoPlane}`}>
								<img src="/picto_avion.png" alt="picto avion" />
							</div>
						</section>
						<section className={`${style.searchSection}`}>
							<SearchPOI />
							<div className={`${style.searchSectionBottomLine}`}>
								<h2 className="subtitleCategoryDark">
									Choisis une ville et trouve ses points d'intérêt
								</h2>
							</div>
						</section>
					</>
				) : (
					<section className={`${style.mobileSection}`}>
						<h1>CITY GUIDE</h1>
						<img src="/wave_with_map_mobile.svg" alt="wave with map" />
						<button
							className={`buttonHomePage textButton ${style.presentationButton}`}
						>
							<FontAwesomeIcon icon={faPaperPlane} />
							Explorez
						</button>
						<h2 className="subtitleCategoryDark">
							Trouvez votre point d'intérêt !
						</h2>
					</section>
				)}
			</div>
		</UserProvider>
	);
};

export default HomePage;
