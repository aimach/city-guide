import { useForm } from "react-hook-form";
import styles from "../../style/form.module.scss";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faAt, faKey } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import useWindowDimensions from "../../utils/hooks/useWindowDimensions";

export interface FormProps {
  email: string;
  password: string;
  username: string;
}

const Register = () => {
  const {
    handleSubmit,
    register,
    setError,
    formState: { errors },
  } = useForm<FormProps>({
    defaultValues: {
      email: "",
      username: "",
      password: "",
    },
  });

  const navigate = useNavigate();
  const windowSize = useWindowDimensions();

  const onSubmit = async (userData: FormProps) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_PUBLIC_BACKEND_URL}/api/auth/register`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(userData),
        }
      );

      const data = await response.json();

      console.log(data.error);
      if (response.status !== 201) {
        // On gère l'erreur à ce niveau
        // Object.keys(data.errors) = ['email', 'username', 'password']
        // Pour chaque paramètre de data.errors, on va afficher le message d'erreur dans le champ correspondant

        Object.keys(data.error).forEach((error) => {
          setError(error as keyof FormProps, {
            message: data.error[error],
          });
        });
        return;
      } else {
        navigate("/");
      }

      // Handle other cases here
    } catch (error: any) {
      console.log("error", error.message);
    }
  };

  return (
    <section className={styles.section_register}>
      {windowSize > 768 ? (
        <h2 className={styles.h2_register}>Nous rejoindre</h2>
      ) : null}
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <h3>Inscription</h3>

        <div className="input-wrapper">
          <FontAwesomeIcon icon={faAt} className="icon" />
          <input
            type="text"
            placeholder="Adresse mail"
            {...register("email", {
              required: "Vous devez renseigner ce champ",
            })}
          />
        </div>
        {errors.email && <p className="error">{errors.email.message}</p>}

        <div className="input-wrapper">
          <FontAwesomeIcon icon={faUser} className="icon" />
          <input
            type="text"
            placeholder="Nom d'utilisateur"
            {...register("username", {
              required: "Vous devez renseigner ce champ",
            })}
          />
        </div>
        {errors.username && <p className="error">{errors.username.message}</p>}

        <div className="input-wrapper">
          <FontAwesomeIcon icon={faKey} className="icon" />
          <input
            type="password"
            placeholder="Mot de passe"
            {...register("password", {
              required: "Vous devez renseigner ce champ",
            })}
          />
        </div>
        {errors.password && <p className="error">{errors.password.message}</p>}

        <input type="submit" value="Explorer" />
        <Link to="/auth/login">
          Vous avez déjà un compte ? Connectez-vous ici !
        </Link>
        {errors.root?.serverError && (
          <p className="error">{errors.root.serverError.message}</p>
        )}
      </form>
    </section>
  );
};

export default Register;
