import { useForm, SubmitHandler } from "react-hook-form";
import './login.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faKey } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";

interface IFormInput {
  emailAddress: String
  username: String
  password: String
}

const Login = () => {
  const { register, handleSubmit, formState: {errors} } = useForm<IFormInput>()
  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    //  console.log(data);

    // 1. Envoyer l'email et le password à l'API (fetch, http://localhost:5000/auth/login)
    // 
    // À l'issue de cet appel, l'API nous renvoie un token.
    // PRATIQUE PASSABLE (+simple, mais potentiellement soumise à une faille de sécurité): stocke le token via le localStorage mis en place côté front.
    //
    // BONNE PRATIQUE (+compliqué, IDÉAL): , via un cookie httpOnly renvoyé par le backend.
    //    - credentials: "include"
    //
    //    - + complexe pour avoir l'état actuel de l'utilisateur (savoir si l'utilisateur est déjà connecté)
    //      UserContext -> 
    //        1. Appeler l'API pour récupérer l'utilisateur connecté (si connecté)
    //          -> useEffect (1x au chargement de la page)
    //        2. Stocker l'état courant : connecté/déconnecté (+utilisateur éventuellement)
    //          -> useState (état courant)
    //
    //      - => solution: créer un endpoint `/users/me` qui renvoie l'utilisateur connecté (ou une erreur 401 si pas connecté)
    //        (côté back, - de récupérer le token dans le cookie httpOnly
    //                    - de vérifier que le token est valide (jwt.verify)
    //                 - de récupérer l'utilisateur correspondant à l'id stocké dans le token)
    //
    //    - déconnexion: supprimer le cookie httpOnly, pour cela, créer un endpoint `/auth/logout` et l'appeler.
    //      (https://expressjs.com/en/api.html#res.clearCookie)
    let url: string = "https://jsonplaceholder.typicode.com/posts/1";
   fetch(url, 
   {
    credentials: "include",
    method: "POST"
   })
    .then(response => response.json())
    .then(data => console.log(data));
}

  

  return (
    <section>
      <h2>De retour ?</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h3>Connexion</h3>

      <div className="containerInput">
        <div className="containerIcon">
          <FontAwesomeIcon icon={faEnvelope}/>
        </div>
        <input type="email" {...register("emailAddress", { required: "Vous devez renseigner une adresse mail" })} placeholder="Adresse mail" />
        {errors.emailAddress && <span>{errors.emailAddress?.message}</span>}
      </div>

       <div className="containerInput">
        <div className="containerIcon">
          <FontAwesomeIcon icon={faKey}/>
        </div>
        <input type="password" {...register("password", { required: "Vous devez renseigner un mot de passe" })} placeholder="Mot de passe" />
        {errors.password && <span>{errors.password?.message}</span>}
      </div>



        <input type="submit" value="Explorez" />
        <Link to="/register">Vous n’avez pas de compte ? Créez en un juste ici !</Link>
        <span>Téléchargez l’application ici.</span>
          <div className="container--DownloadApp">
            <img alt="Apple Store download svg" src="/appleDownload.svg"/>
            <img alt="Apple Store download svg" src="/google-play-badge.png"/>
          </div>
      </form>
    </section>
  )
}

export default Login