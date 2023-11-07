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
import { Link } from "react-router-dom";

const AsideMenu = () => {
	return (
		<>
			<section className={styles.contentAsideMenu}>
				<aside>
					<ul>
						<li className={`textButtonList`}>
							<span className={styles.itemFlex}>
								<FontAwesomeIcon icon={faHouse} className={styles.iconSpaces} />
								<Link to={`/`} className={styles.itemAsideMenu}>
									Retour sur le site
								</Link>
							</span>
						</li>
						<li className={`textButtonList`}>
							<span className={styles.itemFlex}>
								<FontAwesomeIcon icon={faUser} className={styles.iconSpaces} />
								Administrateur
							</span>
							<ol>
								<li className={`textButtonSublist`}>
									<span className={styles.itemFlex}>
										<FontAwesomeIcon
											icon={faUser}
											className={styles.iconSpaces}
										/>
										Profils
									</span>
								</li>
								<li className={`textButtonSublist`}>
									<span className={styles.itemFlex}>
										<FontAwesomeIcon
											icon={faCity}
											className={styles.iconSpaces}
										/>
										Villes
									</span>
								</li>
								<li className={`textButtonSublist`}>
									<span className={styles.itemFlex}>
										<FontAwesomeIcon
											icon={faFolder}
											className={styles.iconSpaces}
										/>
										Catégories
									</span>
								</li>
								<li className={`textButtonSublist`}>
									<span className={styles.itemFlex}>
										<FontAwesomeIcon
											icon={faLocationDot}
											className={styles.iconSpaces}
										/>
										Point d'intérêts
									</span>
								</li>
								<li className={`textButtonSublist`}>
									<span className={styles.itemFlex}>
										<FontAwesomeIcon
											icon={faUserPlus}
											className={styles.iconSpaces}
										/>
										Utilisateurs
									</span>
								</li>
							</ol>
						</li>
						<li className={`textButtonList`}>
							<span className={styles.itemFlex}>
								<FontAwesomeIcon icon={faUsers} className={styles.iconSpaces} />
								Administrateur de ville
							</span>
							<ol>
								<li className={`textButtonSublist`}>
									<span className={styles.itemFlex}>
										<FontAwesomeIcon
											icon={faLocationDot}
											className={styles.iconSpaces}
										/>
										Point d'intérêts
									</span>
								</li>

								<li className={`textButtonSublist`}>
									<span className={styles.itemFlex}>
										<FontAwesomeIcon
											icon={faUser}
											className={styles.iconSpaces}
										/>
										Utilisateurs
									</span>
								</li>
							</ol>
						</li>
					</ul>
				</aside>
			</section>
		</>
	);
};

export default AsideMenu;
