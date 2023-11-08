import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import Title from "../../../components/common/Title";
import BackOfficeLayout from "../../../components/layout/BackOfficeLayout";

const PoiCitiesAdmin = () => {
	return (
		<>
			<BackOfficeLayout>
				<Title name={"Point d'intérêts"} icon={faLocationDot}></Title>
				<p>je suis dans la page des poi des administrateurs de villes</p>
			</BackOfficeLayout>
		</>
	);
};
export default PoiCitiesAdmin;
