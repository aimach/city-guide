import { faUser } from "@fortawesome/free-solid-svg-icons";
import BackOfficeLayout from "../../../components/layout/BackOfficeLayout";
import styles from "./Profil.module.scss";
import Title from "../../../components/common/Title/Title";
import { useContext, useEffect, useState } from "react";
import { UsersContext } from "../../../../contexts/UserContext";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";

const Profil = () => {
  const { profile } = useContext(UsersContext);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    bio: "",
    image: "",
    role: "",
    password: "",
  });

  const [passwordVisible, setPasswordVisible] = useState(false);

  useEffect(() => {
    if (profile) {
      setFormData({
        username: profile.username ?? "",
        email: profile.email ?? "",
        bio: profile.bio ?? "",
        image: profile.image ?? "",
        role: profile.role ?? "",
        password: "",
      });
    }
  }, [profile]);

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const userId = profile?.id;
    const apiUrl = `http://localhost:5000/api/profile/${userId}`;
    try {
      const response = await fetch(apiUrl, {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(formData),
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

  const handleFileButtonClick = () => {
    document.getElementById("imageAvatar")?.click();
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <BackOfficeLayout>
      <Title name={"Profil"} icon={faUser} />
      <div className={styles.profilContainer}>
        <h4 className={styles.titleForm}>Modifier ses données du profil</h4>
        <form className={styles.profilForm} onSubmit={handleSubmit}>
          <div className={styles.twoColumns}>
            <div className={styles.inputGroup}>
              <label htmlFor="name">Nom</label>
              <input
                id="name"
                type="text"
                name="username"
                placeholder="Nom"
                value={formData.username}
                onChange={handleInputChange}
              />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="status">Statut</label>
              <input
                type="text"
                id="status"
                name="role"
                value={formData.role}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className={styles.twoColumns}>
            <div className={styles.inputGroup}>
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="password">Mot de passe</label>
              <div className={styles.inputWithIcon}>
                <input
                  id="password"
                  type={passwordVisible ? "text" : "password"}
                  name="password"
                  placeholder="Mot de passe"
                  value={formData.password}
                  onChange={handleInputChange}
                />
                <span
                  onClick={togglePasswordVisibility}
                  className={styles.passwordIcon}
                >
                  {passwordVisible ? <IoEyeOffOutline /> : <IoEyeOutline />}
                </span>
              </div>
            </div>
          </div>
          <div className={styles.fullWidth}>
            <label htmlFor="imageAvatar">Image - Avatar</label>
            <div className={styles.fileInputContainer}>
              <input
                id="imageAvatar"
                type="file"
                name="image"
                placeholder="Image"
                style={{ display: "none" }}
                value={formData.image}
                onChange={handleInputChange}
              />
              <button type="button" onClick={handleFileButtonClick}>
                ...
              </button>
            </div>
          </div>
          <div className={styles.fullWidth}>
            <label htmlFor="descriptionBio">Description - Bio</label>
            <textarea
              id="descriptionBio"
              name="bio"
              placeholder="Description"
              value={formData.bio}
              onChange={handleInputChange}
            />
          </div>
          <div className={styles.fullWidth}>
            <button type="submit">Mettre à jour</button>
          </div>
        </form>
      </div>
    </BackOfficeLayout>
  );
};
export default Profil;
