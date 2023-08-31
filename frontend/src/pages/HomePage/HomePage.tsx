// import React, { useContext } from 'react'
import Header from "../../components/common/header/Header";
import { UsersContext, UserProvider } from "../../contexts/UserContext";
import { useNavigate, useSearchParams } from "react-router-dom";
import InteractiveMap from "../../components/interactiveMap/InteractiveMap";
import { useContext, useEffect, useState } from "react";
import Footer from "../../components/common/footer/Footer";
import "./homePage.scss";
import SearchPOI from "../SearchPOI/SearchPOI";

const HomePage = () => {
	const [windowSize, setWindowSize] = useState<number>(window.innerWidth);

	function updateDimension() {
		setWindowSize(window.innerWidth);
	}

	useEffect(() => {
		window.addEventListener("resize", updateDimension);
	}, [windowSize]);

	const navigate = useNavigate();
	const { isAuthenticated, logout, redirectToLogin } = useContext(UsersContext);
	// On vérifie si l'utilisateur est connecté.

	const [searchParams] = useSearchParams();

	// je recupere la chaine de caractere presente dans l'url
	// qui commence par ?serach=nomEcritDansL'input , la donnée de l'input (la ville)
	/* a deplacer dans la page de la carte 
	const { search } = Object.fromEntries([...searchParams]);
	console.log("search", search);
    */
	return (
		<UserProvider>
			<Header size={windowSize > 768 ? "desktop" : "mobile"} />
			<div>
				<InteractiveMap />
				<SearchPOI />
			</div>
			<Footer />
		</UserProvider>
	);
};

export default HomePage;
