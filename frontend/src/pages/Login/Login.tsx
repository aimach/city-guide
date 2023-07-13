// import { useContext } from 'react';
// import { UserContext } from '../../contexts/UserContext';
import { useState } from "react";
import "../../style/form.module.scss";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export interface FormProps {
  email: string;
  password: string;
}

const Login = () => {
  // const {setIsAuthenticated} = useContext(UserContext);
  const [error, setError] = useState<string>("");
  const { handleSubmit, register } = useForm<FormProps>();
  const navigate = useNavigate();
  const onSubmit = async (userData: FormProps) => {
    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        credentials: "include",
        body: JSON.stringify(userData),
      });

      if (response.status !== 200) {
        setError("Identifiants incorrects");
        return;
      }

      navigate("/");

      /* if(data.token) {
        localStorage.setItem("jwt_autorization", data.token)
        navigate("/")
        return
      } */
    } catch (error) {
      console.log(error);
    }
  };

  if (
    localStorage.getItem("jwt_autorization") &&
    localStorage.getItem("jwt_autorization") !== undefined
  ) {
    navigate("/");
  }
  // Ici, on ajoute la logique de connexion.
  // On se base sur `data` pour faire la requête à l'API.
  // Si la requête est un succès, on met à jour le contexte
  // avec la fonction `setIsAuthenticated` et on redirige vers la page d'accueil.

  return (
    <section>
      <h2>De retour ?!</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h3>Connexion</h3>

        <input
          type="text"
          placeholder="Adresse mail"
          {...register("email", {
            required: "Vous devez renseigner ce champ",
          })}
        />

        <input
          type="password"
          placeholder="Mot de passe"
          {...register("password", {
            required: "Vous devez renseigner ce champ",
          })}
        />

        {error && <p className="error">{error}</p>}

        <input type="submit" value="Explorer" />
      </form>
    </section>
  );
};

export default Login;
