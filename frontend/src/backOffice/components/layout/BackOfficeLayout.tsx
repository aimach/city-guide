import { useEffect, type PropsWithChildren, useState, useContext } from "react";
import AsideMenu from "../common/AsideMenu/AsideMenu";
import styles from "./BackOfficeLayout.module.scss";
import { UsersContext } from "../../../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import { Role } from "../../../utils/types";

export default function BackOfficeLayout({ children }: PropsWithChildren) {
	const [windowSize, setWindowSize] = useState<number>(window.innerWidth);

	const { isAuthenticated, loaded, redirectToLogin, profile } =
		useContext(UsersContext);
	const navigate = useNavigate();

	useEffect(() => {
		if (profile && profile.role !== Role.ADMIN) navigate("/");
	}, [profile]);

	function updateDimension() {
		setWindowSize(window.innerWidth);
	}
	useEffect(() => {
		window.addEventListener("resize", updateDimension);
	}, [windowSize]);

	useEffect(() => {
		// Si on a fait la requête pour savoir si l'utilisateur est connecté
		// et qu'il ne l'est pas,
		// on le redirige vers la page de connexion.
		if (!isAuthenticated() && loaded) {
			redirectToLogin();
		}
	}, [isAuthenticated, loaded, redirectToLogin]);

	return (
		<>
			<div className={styles.layoutBackOffice}>
				<section className={styles.flexAsideMenu}>
					<AsideMenu />
				</section>
				<section className={styles.flexContent}>
					<div className={styles.backOfficeContent}>{children}</div>
					<div className={styles.footerWave}></div>
				</section>
			</div>
		</>
	);
}
