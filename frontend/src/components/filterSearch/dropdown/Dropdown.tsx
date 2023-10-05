import styles from "./Dropdown.module.scss";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface DropDownProps {
	dropDownName: string;
	// setDropDownName: (dropDownName: string) => void;

	// dropdownValue: string;
	// setDropdownValue: (value: string) => void;
}
const Dropdown = ({ dropDownName }: DropDownProps) => {
	return (
		<>
			<div className={`${styles.containerDdl}`}>
				{/* <div>Dropdown</div> */}
				<p>{dropDownName}</p>
				<FontAwesomeIcon icon={faAngleDown} />
			</div>
		</>
	);
};

export default Dropdown;
