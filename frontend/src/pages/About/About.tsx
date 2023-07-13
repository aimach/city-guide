import styles from "./About.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faInstagram,
	faLinkedin,
	faSquareFacebook,
} from "@fortawesome/free-brands-svg-icons";

const About = () => {
	return (
		<div className={`${styles.mainFooter}`}>
			<div className={`${styles.mobileImage}`}>
				<div className={`${styles.mobileCategoryFooter}`}>
					<h4 className={`${styles.mobileTitleFooter} titleResearch`}>
						A propos
					</h4>
					<ul className={`textSearch`}>
						<li>FAQ</li>
						<li>Conditions générales d’utilisation</li>
						<li>Politiques de confidentialité</li>
						<li>Presse</li>
					</ul>
					<div className={`${styles.layoutPicto}`}>
						<FontAwesomeIcon
							icon={faInstagram}
							className={`${styles.iconColor}`}
						/>
						<FontAwesomeIcon
							icon={faSquareFacebook}
							className={`${styles.iconColor}`}
						/>
						<FontAwesomeIcon
							icon={faLinkedin}
							className={`${styles.iconColor}`}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default About;
