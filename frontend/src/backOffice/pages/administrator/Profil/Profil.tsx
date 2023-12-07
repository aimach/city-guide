import { faUser } from "@fortawesome/free-solid-svg-icons";
import BackOfficeLayout from "../../../components/layout/BackOfficeLayout";
import styles from "./Profil.module.scss";
import Title from "../../../components/common/Title/Title";

const Profil = () => {
  const handleFileButtonClick = () => {
    document.getElementById("imageAvatar")?.click();
  };

  return (
    <BackOfficeLayout>
      <Title name={"Profil"} icon={faUser} />
      <div className={styles.profilContainer}>
        <h4 className={styles.titleForm}>Modifier ses données du profil</h4>
        <form className={styles.profilForm}>
          <div className={styles.twoColumns}>
            <div className={styles.inputGroup}>
              <label htmlFor="name">Nom</label>
              <input id="name" type="text" name="name" placeholder="Nom" />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="status">Statut</label>
              <select id="status" name="status">
                <option>Administrateur de ville</option>
                <option>Utilisateur</option>
              </select>
            </div>
          </div>
          <div className={styles.twoColumns}>
            <div className={styles.inputGroup}>
              <label htmlFor="email">Email</label>
              <input id="email" type="email" name="email" placeholder="Email" />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="password">Mot de passe</label>
              <input
                id="password"
                type="password"
                name="password"
                placeholder="Mot de passe"
              />
            </div>
          </div>
          <div className={styles.fullWidth}>
            <label htmlFor="imageAvatar">Image - Avatar</label>
            <div className={styles.fileInputContainer}>
              <input
                id="imageAvatar"
                type="file"
                name="imageAvatar"
                placeholder="Image"
                style={{ display: "none" }}
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
              name="descriptionBio"
              placeholder="Description"
            />
          </div>
          <div className={styles.fullWidth}>
            <button type="submit">Ajouter</button>
          </div>
        </form>
      </div>
    </BackOfficeLayout>
  );
};
export default Profil;
