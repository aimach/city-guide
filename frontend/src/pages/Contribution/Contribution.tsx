/* eslint-disable react-hooks/exhaustive-deps */
import styles from "./Contribution.module.scss";
import Layout from "../../components/layout/Layout";
import { useContext, useEffect, useState } from "react";
import { Category, City } from "../../utils/types";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { createPoi } from "../../utils/api";
import ItemLi from "../../backOffice/components/common/ItemLi/Itemli";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import useWindowDimensions from "../../utils/hooks/useWindowDimensions";
import { UsersContext } from "../../contexts/UserContext";

type Inputs = {
  name: string;
  description: string;
  address: string;
  phoneNumber: string;
  city: string;
  coordinates: [latitude: string, longitude: string];
  category: string;
  image: File[] | string;
};

const Contribution = () => {
  const navigate = useNavigate();
  const windowSize = useWindowDimensions();
  const [cities, setCities] = useState<City[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const { isAuthenticated } = useContext(UsersContext);

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate("/");
    }
  }, [isAuthenticated]);

  const getCities = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_PUBLIC_BACKEND_URL}/api/cities`
      );
      const data = await response.json();
      setCities(data);
    } catch (error) {
      console.log(error);
    }
  };
  const getCategories = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_PUBLIC_BACKEND_URL}/api/categories`
      );
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getCities();
    getCategories();
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (poiData: Inputs) => {
    const formData = new FormData();

    Object.keys(poiData).forEach((key) => {
      if (key !== "image") {
        formData.append(key, poiData[key as keyof Inputs] as string);
      }
    });

    // include image file in body
    formData.append("image", poiData.image[0]);

    try {
      const response = await createPoi(formData);
      if (response?.status === 201) {
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <section className={styles.section_contribution}>
        {windowSize > 768 && (
          <Link to="/">
            <ItemLi icon={faHouse} name="" path="/"></ItemLi>
          </Link>
        )}

        <h2>Une idée ?</h2>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <h3>Contribution</h3>
          <div className="input-wrapper">
            {
              // MAX 100 CHARACTERS
            }
            <input
              type="text"
              placeholder="Nom du point d'intérêt"
              {...register("name", {
                required: "Vous devez renseigner ce champ",
                minLength: {
                  value: 2,
                  message: "Le nom doit faire 2 caractères minimum",
                },
                maxLength: {
                  value: 100,
                  message: "Le nom doit faire 100 caractères maximum",
                },
              })}
            />
          </div>
          {errors.name && <p className="error">{errors.name.message}</p>}
          <div className="input-wrapper">
            <input
              type="text"
              placeholder="Description"
              {...register("description", {
                required: "Vous devez renseigner ce champ",
              })}
            />
          </div>
          {errors.description && (
            <p className="error">{errors.description.message}</p>
          )}
          <div className="input-wrapper">
            <input
              type="text"
              placeholder="Adresse"
              {...register("address", {
                required: "Vous devez renseigner ce champ",
              })}
            />
          </div>
          {errors.address && <p className="error">{errors.address.message}</p>}
          <div className="input-wrapper">
            <input
              type="tel"
              placeholder="Téléphone"
              {...register("phoneNumber", {
                required: "Vous devez renseigner ce champ",
                pattern: {
                  value:
                    /^(?:(?:(?:\+|00)33[ ]?(?:\(0\)[ ]?)?)|0){1}[1-9]{1}(?:\d{2}\1?){3}\d{2}$/,
                  message:
                    "Le numéro de téléphone n'est pas valide. Format : 0612345678",
                },
              })}
            />
          </div>
          {errors.phoneNumber && (
            <p className="error">{errors.phoneNumber.message}</p>
          )}
          <div className="input-wrapper">
            <select
              {...register("city", {
                required: "Vous devez renseigner ce champ",
              })}
            >
              <option>Choisir une ville</option>
              {cities.map((city) => (
                <option key={city.id} value={city.id as string}>
                  {city.name}
                </option>
              ))}
            </select>
          </div>
          {errors.city && <p className="error">{errors.city.message}</p>}
          <div className="input-wrapper">
            <input
              type="text"
              placeholder="Latitude"
              {...register("coordinates.0", {
                required: "Vous devez renseigner ce champ",
                pattern: {
                  value: /^-?([0-9]{1,2}|1[0-7][0-9]|180)(\.[0-9]{1,10})$/,
                  message: "La coordonnée n'est pas valide. Format : 43.123456",
                },
              })}
            />
          </div>
          {errors.coordinates?.[0] && (
            <p className="error">{errors.coordinates[0].message}</p>
          )}
          <div className="input-wrapper">
            <input
              type="text"
              placeholder="Longitude"
              {...register("coordinates.1", {
                required: "Vous devez renseigner ce champ",
                pattern: {
                  value: /^-?([0-9]{1,2}|1[0-7][0-9]|180)(\.[0-9]{1,10})$/,
                  message: "La coordonnée n'est pas valide. Format : 43.123456",
                },
              })}
            />
          </div>
          {errors.coordinates?.[1] && (
            <p className="error">{errors.coordinates[1].message}</p>
          )}
          <div className="input-wrapper">
            <select
              {...register("category", {
                required: "Vous devez renseigner ce champ",
              })}
            >
              <option>Choisir une catégorie</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id as string}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          {errors.category && (
            <p className="error">{errors.category.message}</p>
          )}
          <div className="input-wrapper">
            <input
              type="file"
              {...register("image", {
                required: "Vous devez soumettre une image",
              })}
            />
          </div>
          {errors.image && <p className="error">{errors.image.message}</p>}
          <input type="submit" value="Contribuer" />
        </form>
      </section>
    </Layout>
  );
};

export default Contribution;
