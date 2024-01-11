import { faUser } from "@fortawesome/free-solid-svg-icons";
import BackOfficeLayout from "../../../components/layout/BackOfficeLayout";
import Title from "../../../components/common/Title/Title";
import { useContext } from "react";
import { UsersContext } from "../../../../contexts/UserContext";
import UserProfilForm from "../../../components/common/Form/UserProfilForm";

export interface FormData {
  username: string;
  email: string;
  bio: string;
  image: string;
  role: string;
  password: string;
}

const ProfilAdminCity = () => {
  const { profile } = useContext(UsersContext);

  const handleFormSubmit = async (formdata: FormData) => {
    const userId = profile?.id;
    const apiUrl = `http://localhost:5000/api/profile/${userId}`;
    try {
      const response = await fetch(apiUrl, {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(formdata),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Profil mis à jour avec succès.");
      } else {
        alert(`Erreur: ${data.error}`);
      }
    } catch (error) {
      if (error instanceof Error) {
        alert(`Erreur de connexion au serveur: ${error.message}`);
      } else {
        alert("Une erreur inconnue s'est produite.");
      }
    }
  };

  return (
    <BackOfficeLayout>
      <Title name={"Profil"} icon={faUser} />
      <UserProfilForm
        profile={profile}
        onSubmit={handleFormSubmit}
        role="admin_city"
      />
    </BackOfficeLayout>
  );
};
export default ProfilAdminCity;
