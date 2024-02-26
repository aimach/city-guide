/* eslint-disable react-hooks/exhaustive-deps */
import { ReactNode, useState, createContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "../utils/types";

// fournit le context de l'utilisateur
interface ProviderProps {
  children?: ReactNode;
}

interface ContextProps {
  isAuthenticated: () => boolean;
  profile: User | null;
  logout: () => void;
  redirectToLogin: () => void;
  loaded: boolean;
  checkUserSession: () => void;
}

export const UsersContext = createContext<ContextProps>({
  profile: null,
  isAuthenticated: () => false,
  logout: () => {},
  redirectToLogin: () => {},
  loaded: false,
  checkUserSession: () => {},
});

export const UserProvider = ({ children }: ProviderProps) => {
  // useState
  const [profile, setProfile] = useState<User | null>(null);
  const [loaded, setLoaded] = useState(false);
  const navigate = useNavigate();

  const checkUserSession = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_PUBLIC_BACKEND_URL}/api/profile/my-profile`,
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
      navigate("/auth/login");
    }
  };

  useEffect(() => {
    if (loaded) checkUserSession();
  }, [navigate]);

  const isAuthenticated = () => {
    return profile !== null;
  };

  const logout = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_PUBLIC_BACKEND_URL}/api/auth/logout`,
        {
          credentials: "include",
        }
      );
      const data = await response.json();
      if (data === "Logged out") {
        setProfile(null);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const redirectToLogin = () => {
    if (loaded && profile == null) {
      navigate("/auth/login");
    }
  };

  return (
    <UsersContext.Provider
      value={{
        profile,
        isAuthenticated,
        logout,
        redirectToLogin,
        loaded,
        checkUserSession,
      }}
    >
      {children}
    </UsersContext.Provider>
  );
};
