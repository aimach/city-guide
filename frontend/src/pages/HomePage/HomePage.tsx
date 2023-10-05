// import React, { useContext } from 'react'
import { UsersContext } from "../../contexts/UserContext";
// import { useNavigate } from 'react-router-dom';
import InteractiveMap from "../../components/interactiveMap/InteractiveMap";
import { useContext } from "react";
import "./homePage.scss";

const HomePage = () => {
	//    const navigate = useNavigate();
	//    const { isAuthenticated, logout, redirectToLogin } =
	useContext(UsersContext);
	// On vérifie si l'utilisateur est connecté.

	return (
		<div>
			<InteractiveMap />
		</div>
	);
};

export default HomePage;
