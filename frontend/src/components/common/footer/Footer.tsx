// import "./Footer.module.scss";
// import picto_footer from "@/assets/picto_footer.png";
// import picto_footer from "./../../../assets/picto_footer.png";
import styles from "./Footer.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faInstagram,
	faLinkedin,
	faSquareFacebook,
} from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
	return (
		<div className={`${styles.mainFooter}`}>
			<section className={`${styles.sectionFooter}`}>
				{/* <section className={`sectionFooter`}> */}
				<div className={`${styles.titleLogoFooter}`}>
					<h3 className="logoFooter">City Guide</h3>
					<div className={`${styles.imageLayout}`}>
						<img
							src="/picto_footer.png"
							alt="picto_footer"
							className={`${styles.image01}`}
						/>
						<img
							src="/picto_avion.png"
							alt="picto_avion"
							className={`${styles.image02}`}
						/>
					</div>
				</div>
				<div className={`${styles.categoryFooter}`}>
					<div className={`${styles.layoutCategory}`}>
						<div>
							<h4 className={`${styles.subtitleFooter} textCard`}>Contact</h4>
							<ul className={`textSearch`}>
								<li>Nous contacter</li>
								<li>FAQ</li>
							</ul>
						</div>
						<div>
							<h4 className={`${styles.subtitleFooter} textCard `}>A propos</h4>
							<ul className={`textSearch`}>
								<li>À propos</li>
								<li>Presse</li>
								<li>
									Conditions générales <br />
									d’utilisation
								</li>
							</ul>
						</div>
						<div>
							<h4 className={`${styles.subtitleFooter} textCard`}>
								Réseaux sociaux
							</h4>
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
							<p className={`textSearch`}>Politiques de confidentialité</p>
						</div>
					</div>
				</div>
			</section>
			<p className={`${styles.mentionFooter}`}>
				Loremipsumdolorsitametconsecteturadip
			</p>
		</div>
	);
};
export default Footer;
