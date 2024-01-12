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
				{typeButton === "icon" && <FontAwesomeIcon icon={icon as IconProp} />}
				{typeButton === "text" && <p>{text}</p>}
			</button>
		</>
	);
};
export default Button;
