// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faCheck } from "@fortawesome/free-solid-svg-icons";
import "./Checkbox.module.scss";
// import { useState } from "react";
// import styles from "./Checkbox.module.scss";
import "./Checkbox.module.scss";

const Checkbox = ({ value, onChange }: any) => {
	return (
		<label>
			<input type="checkbox" checked={value} onChange={onChange} />
			{/* <FontAwesomeIcon icon={faCheck} /> */}
		</label>
	);
};
export default Checkbox;

// const Checkbox = ({ checked, onChange }: any) => {
// 	return (
// 		<>
// 			<div>
// 				<div className={styles.toto}>
// 					<input type="checkbox" checked={checked} onChange={onChange} />
// 					<label>
// 						<FontAwesomeIcon icon={faCheck} />
// 					</label>
// 					{/* <div
// 						className={styles.bibi}
// 					/> */}
// 				</div>

// 				{/* <div>
// 					<input
// 						type="checkbox"
// 						checked={checked}
// 						onChange={onChange}
// 						// style={{ display: "none" }}
// 					/>
// 					<label htmlFor="customCheckbox">
// 						<FontAwesomeIcon icon={faCheck} />
// 					</label>
// 				</div> */}

// 			</div>
// 		</>
// 	);
// };
// export default Checkbox;
