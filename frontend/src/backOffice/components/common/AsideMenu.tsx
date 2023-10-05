import {
	faCity,
	faFolder,
	faHouse,
	faLocationDot,
	faUser,
	faUserPlus,
	faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./AsideMenu.module.scss";

const AsideMenu = () => {
	return (
		<>
			<section className={styles.contentAsideMenu}>
				<aside>
					<ul>
						{/* className={`textButton ${style.menu}`} */}
						<li className={`textButtonList`}>
							<FontAwesomeIcon icon={faHouse} className={styles.iconSpaces} />
							Retour sur le site
						</li>
						<li className={`textButtonList`}>
							<FontAwesomeIcon icon={faUser} />
							Administrateur
							<ul>
								<li className={`textButtonSublist`}>
									<FontAwesomeIcon icon={faUser} />
									Profils
								</li>
								<li className={`textButtonSublist`}>
									<FontAwesomeIcon icon={faCity} />
									Villes
								</li>
								<li className={`textButtonSublist`}>
									<FontAwesomeIcon icon={faFolder} />
									Catégories
								</li>
								<li className={`textButtonSublist`}>
									<FontAwesomeIcon icon={faLocationDot} />
									Point d'intérêts
								</li>
								<li className={`textButtonSublist`}>
									<FontAwesomeIcon icon={faUserPlus} />
									Utilisateurs
								</li>
							</ul>
						</li>
						<li className={`textButtonList`}>
							<FontAwesomeIcon icon={faUsers} />
							Administrateur de ville
							<ul>
								<li className={`textButtonSublist`}>
									<FontAwesomeIcon icon={faLocationDot} />
									Point d'intérêts
								</li>

								<li className={`textButtonSublist`}>
									<FontAwesomeIcon icon={faUser} />
									Utilisateurs
								</li>
							</ul>
						</li>
					</ul>
				</aside>
			</section>
		</>
	);
};

export default AsideMenu;
