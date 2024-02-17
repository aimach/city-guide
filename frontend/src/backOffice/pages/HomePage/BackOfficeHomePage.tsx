import styles from "./BackOfficeHomePage.module.scss";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import BackOfficeLayout from "../../components/layout/BackOfficeLayout";
import Title from "../../components/common/Title/Title";
import { useContext } from "react";
import { UsersContext } from "../../../contexts/UserContext";
import { Role } from "../../../utils/types";

const HomePage = () => {
  const { profile } = useContext(UsersContext);
  return (
    <BackOfficeLayout>
      <Title
        icon={faHouse}
        name={`Bienvenue sur le Dashboard d'administrateur ${
          profile?.role === Role.ADMIN ? "du site" : "de ville"
        }`}
      />
      <div className={styles.illustrationBackOffice}></div>
    </BackOfficeLayout>
  );
};

export default HomePage;
