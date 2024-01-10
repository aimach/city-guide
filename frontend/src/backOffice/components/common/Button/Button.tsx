import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./Button.module.scss";
const Button = ({ icon, onClick }: any) => {
	return (
		<>
			<button className={styles.buttonStyle} onClick={onClick}>
				<FontAwesomeIcon icon={icon} />
			</button>
		</>
	);
};
export default Button;
