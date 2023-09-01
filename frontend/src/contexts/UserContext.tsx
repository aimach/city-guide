import { ReactNode, useState, createContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export type User = {
   id: string;
   username: string;
   email: string;
   image: string | null;
   role: string;
   city: string | null;
   createdPoi: any[];
};

interface ProviderProps {
   children?: ReactNode;
}

interface ContextProps {
   isAuthenticated: () => boolean;
   profile: User | null;
   logout: () => void;
   redirectToLogin: () => void;
}

export const UsersContext = createContext<ContextProps>({
   profile: null,
   isAuthenticated: () => false,
   logout: () => {},
   redirectToLogin: () => {},
});

export const UserProvider = ({ children }: ProviderProps) => {
   // useState
   const [profile, setProfile] = useState(null);
   const [loaded, setLoaded] = useState(false);

   const navigate = useNavigate();
   // useEffect
   useEffect(() => {
      const checkUserSession = async () => {
         // GET /my-profile, en cas de succès on setUser avec les infos de l'utilisateur //
         try {
            const response = await fetch(
               'http://localhost:5000/api/profile/my-profile',
               {
                  credentials: 'include',
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

   console.log(isAuthenticated());
   const logout = async () => {
      try {
         const response = await fetch('http://localhost:5000/api/auth/logout');
         const data = await response.json();
      } catch (error) {
         console.log(error);
      }
   };

   const redirectToLogin = () => {
      if (loaded && profile == null) {
         navigate('/login');
      }
   };

   return (
      <UsersContext.Provider
         value={{ profile, isAuthenticated, logout, redirectToLogin }}
      >
         {children}
      </UsersContext.Provider>
   );
};
