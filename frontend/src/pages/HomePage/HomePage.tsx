import React, { useContext } from 'react'
import Header from '../../components/common/header/Header'
import { UserContext } from '../../contexts/UserContext'
import { useNavigate } from 'react-router-dom'

const HomePage = () => {
  const navigate = useNavigate();
  // On vérifie si l'utilisateur est connecté.
  if(!localStorage.getItem("jwt_autorization") || localStorage.getItem("jwt_autorization") === undefined) {
    console.error('erreur de connexion');
    // navigate('/login');
  }

  return (
    <>
     <Header/>
    </>
  )
}

export default HomePage