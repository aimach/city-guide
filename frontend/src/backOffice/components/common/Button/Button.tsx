import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./Button.module.scss";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

type interfaceButtonProps = {
	icon?: IconProp;
	onClick: () => void;
	typeButton: string;
	text?: string;
};
const Button = ({ icon, onClick, typeButton, text }: interfaceButtonProps) => {
	return (
		<>
			<button
				className={
					typeButton === "icon" ? styles.buttonIcon : styles.buttonText
				}
				onClick={onClick}
			>
				{/* <FontAwesomeIcon icon={icon} /> */}
				{/* je veux un bouton reutilisable pour qu'il switch 
                selon mes besoins d'un bouton icon à bouton text 
                - passer un type au children : props nommé typeButton 
                - si typeBuutoon === icon => j'affiche l'icon*/}
				{typeButton === "icon" && <FontAwesomeIcon icon={icon as IconProp} />}
				{typeButton === "text" && <p>{text}</p>}
			</button>
		</>
	);
};
export default Button;
