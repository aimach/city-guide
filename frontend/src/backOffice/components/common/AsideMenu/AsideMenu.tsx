import {
	faCity,
	faEnvelope,
	faFolder,
	faHouse,
	faLocationDot,
	faUser,
	faUserPlus,
	faUsers,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./AsideMenu.module.scss";
import ItemLi from "../ItemLi/Itemli";

const AsideMenu = () => {
	return (
		<>
			<section className={styles.contentAsideMenu}>
				<aside>
					<ul>
						<ItemLi icon={faHouse} name="Retour sur le site" path="/"></ItemLi>
						<ItemLi
							icon={faUser}
							name="Administrateur du site"
							path="/dashboard/admin"
						>
							<ol>
								<ul className={styles.alignIconAndText}>
									<ItemLi
										icon={faEnvelope}
										name="Messages"
										path="/dashboard/message"
									></ItemLi>
								</ul>
								<ItemLi
									icon={faUser}
									name="Profils"
									path="/dashboard/profil"
								></ItemLi>

								<ItemLi
									icon={faCity}
									name="Villes"
									path="/dashboard/cities"
								></ItemLi>

								<ItemLi
									icon={faFolder}
									name="Catégories"
									path="/dashboard/categories"
								></ItemLi>

								<ItemLi
									icon={faLocationDot}
									name="Point d'intérêts"
									path="/dashboard/poi"
								></ItemLi>

								<ItemLi
									icon={faUserPlus}
									name="Utilisateurs"
									path="/dashboard/users"
								></ItemLi>
							</ol>
						</ItemLi>
						<ul className={`textButtonList`}>
							<ItemLi
								icon={faUsers}
								name="Administrateur de ville"
								path="/dashboard/adminCity"
							>
								<ol>
									<ItemLi
										icon={faLocationDot}
										name="Point d'intérêts"
										path="/dashboard/adminCityPoi"
									></ItemLi>
									<ItemLi
										icon={faUser}
										name="Utilisateurs"
										path="/dashboard/adminCityUsers"
									></ItemLi>
									<ItemLi
										icon={faUser}
										name="Profils"
										path="/dashboard/adminCityProfils"
									></ItemLi>
								</ol>
							</ItemLi>
						</ul>
					</ul>
				</aside>
			</section>
		</>
	);
};

export default AsideMenu;
