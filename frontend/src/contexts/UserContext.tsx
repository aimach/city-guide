import { ReactNode, useState, createContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "../utils/types";

interface ProviderProps {
	children?: ReactNode;
}

interface ContextProps {
	loaded: boolean;
	isAuthenticated: () => boolean;
	profile: User | null;
	logout: () => void | Promise<void>;
	redirectToLogin: () => void;
}

export const UsersContext = createContext<ContextProps>({
	loaded: false,
	profile: null,
	isAuthenticated: () => false,
	logout: () => {},
	redirectToLogin: () => {},
});

export const UserProvider = ({ children }: ProviderProps) => {
	// useState
	const [profile, setProfile] = useState<User | null>(null);
	const [loaded, setLoaded] = useState(false);

	const navigate = useNavigate();
	// useEffect
	useEffect(() => {
		const checkUserSession = async () => {
			// GET /my-profile, en cas de succès on setUser avec les infos de l'utilisateur //
			try {
				const response = await fetch(
					"http://localhost:5000/api/profile/my-profile",
					{
						credentials: "include",
					}
				);
				const data = await response.json();

				setLoaded(true);
				if (!data.error) {
					setProfile(data);
				}
			} catch (err) {
				setLoaded(true);
			}
		};
		checkUserSession();
	}, []);

	const isAuthenticated = () => {
		return profile !== null;
	};

	const logout = async () => {
		try {
			await fetch("http://localhost:5000/api/auth/logout", {
				credentials: "include",
			});
			setProfile(null);
		} catch (error) {
			console.log(error);
		}
	};

	const redirectToLogin = () => {
		navigate("/auth/login");
	};

	return (
		<UsersContext.Provider
			value={{ profile, isAuthenticated, logout, redirectToLogin, loaded }}
		>
			{children}
		</UsersContext.Provider>
	);
};
