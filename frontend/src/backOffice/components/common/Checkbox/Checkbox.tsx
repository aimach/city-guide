// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./Checkbox.module.scss";
// import { faSquare } from "@fortawesome/free-solid-svg-icons";

const Checkbox = () => {
	return (
		<>
			<input type="checkbox" className={styles.checkbox} />
			{/* <FontAwesomeIcon icon={faSquare} /> */}
			{/* <FontAwesomeIcon icon={faSquareCheck} /> */}
			{/* <FontAwesomeIcon icon={faCheck} /> */}
		</>
	);
};
export default Checkbox;
