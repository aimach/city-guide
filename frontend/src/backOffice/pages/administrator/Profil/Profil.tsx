import { faUser } from "@fortawesome/free-solid-svg-icons";
import BackOfficeLayout from "../../../components/layout/BackOfficeLayout";
import styles from "./Profil.module.scss";
import Title from "../../../components/common/Title/Title";

const Profil = () => {
  return (
    <BackOfficeLayout>
      <Title name={"Profil"} icon={faUser}></Title>
      <div>
        <h4 className={styles.titleForm}>Modifier ses données du profil</h4>
        <div className={styles.profilForm}>
          <form>
            <div className={styles.formGroup}>
              <label htmlFor="name">Nom</label>
              <input type="text" />
              <label htmlFor="status">Statut</label>
              <select name="status">
                <option>Adminstrateur de ville</option>
                <option>Utilisateur</option>
              </select>
            </div>
            <div className={styles.formGroup}>
              <div>
                <label htmlFor="email">Email</label>
                <input type="email" name="email" />
                <label htmlFor="password">Mot de passe</label>
                <input type="password" />
              </div>
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="badge">Badge</label>
              <input type="text" />
            </div>
            <div className={styles.fullWidth}>
              <label htmlFor="imageAvatar">Image - Avatar</label>
              <input type="file" name="imageAvatar" />
            </div>
            <div className={styles.fullWidth}>
              <label htmlFor="descriptionBio">Description - Bio</label>
              <textarea name="descriptionBio" />
            </div>
            <div className={styles.fullWidth}>
              <button type="submit">Ajouter</button>
            </div>
          </form>
        </div>
      </div>
    </BackOfficeLayout>
  );
};
export default Profil;
