import { useContext, useEffect, useState } from "react";
import styles from "./UserProfilForm.module.scss";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { UsersContext } from "../../../../contexts/UserContext";
import { User } from "../../../../utils/types"; // Ajustez le chemin selon votre structure de projet

interface UserProfilFormProps {
  onSubmit: (formData: FormData) => void; // Remplacez par le type approprié de votre fonction onSubmit
  role: string;
  profile: User | null;
}

interface FormData {
  username: string;
  email: string;
  bio: string;
  image: string;
  role: string;
  password: string;
}

// Vous pouvez étendre cette interface si vous avez d'autres champs.

const UserProfilForm: React.FC<UserProfilFormProps> = ({
  onSubmit,
  role,
  profile,
}) => {
  const { profile: contextProfile } = useContext(UsersContext);
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
    if (contextProfile) {
      setFormData({
        username: contextProfile.username ?? "",
        email: contextProfile.email ?? "",
        bio: contextProfile.bio ?? "",
        image: contextProfile.image ?? "",
        role: contextProfile.role ?? "",
        password: "",
      });
    }
  }, [contextProfile, role]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(formData); //
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleFileButtonClick = () => {
    document.getElementById("imageAvatar")?.click();
  };

  return (
    <form className={styles.userProfileForm} onSubmit={handleSubmit}>
      <div className={styles.twoColumns}>
        <div className={styles.inputGroup}>
          <label htmlFor="username">Nom d'utilisateur</label>
          <input
            id="username"
            type="text"
            name="username"
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
          onChange={handleTextareaChange}
        />
      </div>
      <button type="submit" className={styles.submitButton}>
        Soumettre
      </button>
    </form>
  );
};

export default UserProfilForm;
