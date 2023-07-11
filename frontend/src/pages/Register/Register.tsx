import { useForm } from 'react-hook-form';
import '../../style/form.module.scss';
import { useNavigate } from 'react-router-dom';

export interface FormProps {
   email: string;
   password: string;
   username: string;
}

const Register = () => {
   const { handleSubmit, register } = useForm<FormProps>();

   const navigate = useNavigate();

   const onSubmit = async (userData: FormProps) => {
      try {
         const response = await fetch(
            'http://localhost:5000/api/auth/register',
            {
               method: 'POST',
               credentials: 'include',
               headers: {
                  'Content-Type': 'application/json',
                  Accept: 'application/json',
               },
               body: JSON.stringify(userData),
            }
         );

         const data = await response.json();
         console.log(data);
         /* if (data.token) {
        localStorage.setItem("jwt_autorization", data.token)
        navigate('/')
        return
      } */

         // Handle other cases here
      } catch (error) {
         console.error(error);
      }
   };

   return (
      <section>
         <form onSubmit={handleSubmit(onSubmit)}>
            <h3>Inscription</h3>
            <input
               type="text"
               placeholder="Adresse mail"
               {...register('email', {
                  required: 'Vous devez renseigner ce champ',
               })}
            />
            <input
               type="text"
               placeholder="Nom d'utilisateur"
               {...register('username', {
                  required: 'Vous devez renseigner ce champ',
               })}
            />

            <input
               type="password"
               placeholder="Mot de passe"
               {...register('password', {
                  required: 'Vous devez renseigner ce champ',
               })}
            />

            <input type="submit" value="Explorer" />
         </form>
      </section>
   );
};

export default Register;
