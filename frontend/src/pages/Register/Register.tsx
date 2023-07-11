import { useForm } from "react-hook-form"
import '../../style/form.scss'
import { useNavigate } from "react-router-dom"

export interface FormProps {
  email: string
  password: string
  username :string
}

const Register = () => {
  const {handleSubmit, register} = useForm<FormProps>();

  const navigate = useNavigate();

  const onSubmit = async(userData: FormProps) => {
    await fetch('http://localhost:5000/api/auth/register', {
      method: "POST",
      credentials: "same-origin",
      headers: { 
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData) 
    })
    .then(response => response.json())
    // .then(data =>(localStorage.setItem("jwt_autorization", JSON.parse(data.token))));
    .then(data => console.log(data))
    // if(localStorage.getItem("jwt_autorization") && localStorage.getItem("jwt_autorization") !== undefined) {
    //   navigate('/')
    // }
  }


  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
    >
      <h3>
        Inscription
      </h3>

              <input type="text" placeholder='Adresse mail' 
              {...register("email", {
            required: "Vous devez renseigner ce champ"
          })}
          />
              <input type="text" placeholder="Nom d'utilisateur" 
              {...register("username", {
                required: "Vous devez renseigner ce champ"
            })}
            />

          <input type="password" placeholder='Mot de passe'
          {...register("password", {
            required: "Vous devez renseigner ce champ"
        })}
        />

<input type="submit" value="Explorer"/>

    </form>
  )
}

export default Register