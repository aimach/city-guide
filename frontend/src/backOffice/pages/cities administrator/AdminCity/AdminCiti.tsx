import { faUser } from "@fortawesome/free-solid-svg-icons";
import BackOfficeLayout from "../../../components/layout/BackOfficeLayout";
import Title from "../../../components/common/Title/Title";

const AdminCity = () => {
  return (
    <BackOfficeLayout>
      <Title name={"Administrateur de ville"} icon={faUser}></Title>
      <p>je suis dans la page admin de ville</p>
    </BackOfficeLayout>
  );
};

export default AdminCity;
