import React, { useContext } from 'react'
import { Link, Outlet } from 'react-router-dom'
import { UserContext } from '../../../contexts/UserContext'

const Header = () => {
  const {isAuthenticated, logout} = useContext(UserContext)

  console.log('isAuthenticated', isAuthenticated)

  // Dans le cours
  // =================
  // Appel /auth/login, avec email+password. Si les identifiants sont bons, on récupère un token, dans le body de la réponse.
  // Pour utiliser ce token, à l'avenir, dans le but d'accéder aux routes authentifiées,
  // on le stockait dans le localStorage, et on l'envoyait dans le header Authorization de chaque requête.
  // Le back vérifiait que l'utilisateur était connecté, en se basant sur ce token depuis le header.
  // On pouvait savoir si l'utilisateur était connecté côté frontend, simplement en sachant qu'il existe une valeur de token dans le localStorage.
  //
  // =================
  // 
  // Avec la meilleure méthode
  // Appel /auth/login, avec email+password. Si les identifiants sont bons, le backend nous renvoie un cookie httpOnly, auquel React ne peut pas accéder.
  // Ce cookie est automatiquement envoyé par le navigateur dans le header de chaque requête, dès qu'on ajoute credentials: "include".
  // Le back vérifie que l'utilisateur était connecté, en se basant sur ce token depuis le cookie httpOnly.
  // On peut vérifier si l'utilisateur est connecté, en appelant le backend (sur une route /auth/me par exemple), et en vérifiant si on reçoit une réponse 200 (de succès).


  return (
    <header>
      <h1>City Guide</h1>
      {isAuthenticated ? (
        <button onClick={logout}>Déconnexion</button>
      ) :(<nav>
          <Link to="/register">Inscription</Link>
          <Link to="/login">Connexion</Link>
      </nav>)}
    </header>
  )
}

export default Header