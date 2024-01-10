import "./Checkbox.module.scss";
import "./Checkbox.module.scss";

const Checkbox = ({ value, onChange }: any) => {
	return (
		<label>
			<input type="checkbox" checked={value} onChange={onChange} />
		</label>
	);
};
export default Checkbox;
