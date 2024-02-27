import BackOfficeLayout from "../../../components/layout/BackOfficeLayout";
import styles from "./Cities.module.scss";
import { faCity, faPen, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import Title from "../../../components/common/Title/Title";
import { useEffect, useState } from "react";
import { City } from "../../../../utils/types";
import Button from "../../../components/common/Button/Button";
import Modal from "../../../../components/common/modals/Modal";
import ModalUpdateCity from "../../../components/modals/ModalUpdateCity";

const Cities = () => {
  const columns = [
    "Nom",
    "Coordonnées GPS",
    "Image",
    "Administrateur de ville",
  ];

  const [cities, setCities] = useState<City[]>([]);
  const getCities = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_PUBLIC_BACKEND_URL}/api/cities`
      );
      const data = await response.json();
      setCities(
        data.map((item: any) => {
          return item;
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

  // DELETE One City
  const handleDeleteOneCity = async (cityToDelete: City) => {
    try {
      await fetch(
        `${process.env.REACT_APP_PUBLIC_BACKEND_URL}/api/cities/${cityToDelete.id}`,
        {
          method: "DELETE",
          credentials: "include",
          body: null,
        }
      );
      const updatedCities = cities.filter(
        (city) => city.id !== cityToDelete.id
      );
      setCities(updatedCities);
      setDisplayModals({ ...displayModals, validation: true });
    } catch (error) {
      console.log("delete error", error);
    }
  };

  //  UPDATE, Modify One City
  const [isModalOpenModify, setIsModalOpenModify] = useState<boolean>(false);

  const [cityToModified, setcityToModified] = useState<City | null>(null);

  const handleUpdateOneCity = (city: City) => {
    setcityToModified(city);
    setIsModalOpenModify(true);
  };

  // ADDED One City
  const [isModalOpenAdd, setIsModalOpenAdd] = useState<boolean>(false);
  const newCity = {
    name: "",
    coordinates: [0, 0],
    image: "",
    userAdminCity: "",
  };

  // Close Modal for Add and Modify modal
  const handleCloseModal = () => {
    setIsModalOpenModify(false);
    setIsModalOpenAdd(false);
  };

  // state for modal management
  const [displayModals, setDisplayModals] = useState<{
    validation: boolean;
    error: boolean;
  }>({
    validation: false,
    error: false,
  });

  useEffect(() => {
    getCities();
  }, [isModalOpenAdd, isModalOpenModify]);

  return (
    <BackOfficeLayout>
      {displayModals.validation ? (
        <Modal
          setDisplayModals={setDisplayModals}
          displayModals={displayModals}
          type="validation"
          setIsModalOpenModify={setIsModalOpenModify}
          isModalOpenModify={isModalOpenModify}
          setIsModalOpenAdd={setIsModalOpenAdd}
          isModalOpenAdd={isModalOpenAdd}
        />
      ) : null}
      <Title icon={faCity} name={"Villes"}></Title>
      <div className={styles.titleAndButton}>
        <h4 className={`${styles.subtitleTable} subtitleDashboard`}>
          Liste des villes
        </h4>
        <Button
          typeButton="text"
          text="Ajouter une ville"
          onClick={() => setIsModalOpenAdd(true)}
        />
      </div>
      <table>
        <thead>
          <tr>
            {columns.map((column) => (
              <th
                key={column}
                className={`${styles.titleTable} fieldTableHead`}
              >
                {column}
              </th>
            ))}
            <th className={`${styles.titleTable} fieldTableHead`}>Modifier</th>
            <th className={`${styles.titleTable} fieldTableHead`}>Supprimer</th>
          </tr>
        </thead>
        <tbody>
          {cities.map((city) => {
            return (
              <tr key={city.id}>
                <td className={`fieldTableBody`}>{city.name}</td>
                <td className={`fieldTableBody`}>
                  <div className={styles.fieldCoordinates}>
                    <span>Lattitude : {city.coordinates.coordinates[0]}</span>
                    <span>Longitude : {city.coordinates.coordinates[1]}</span>
                  </div>
                </td>
                <td className={`${styles.fieldImage} fieldTableBody`}>
                  <img
                    src={
                      city.image.includes("http")
                        ? city.image
                        : `${
                            process.env.REACT_APP_PUBLIC_BACKEND_URL
                          }${city?.image?.slice(1)}`
                    }
                    alt="category"
                    width={100}
                  />
                </td>
                <td className={`fieldTableBody`}>
                  {city.userAdminCity?.username}
                </td>
                <td className={styles.titleTable}>
                  <Button
                    icon={faPen}
                    onClick={() => {
                      handleUpdateOneCity(city);
                    }}
                    typeButton={"icon"}
                  />
                </td>
                <td className={styles.endColumn}>
                  <Button
                    icon={faTrashCan}
                    onClick={() => handleDeleteOneCity(city)}
                    typeButton={"icon"}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {isModalOpenModify && (
        <ModalUpdateCity
          onClose={handleCloseModal}
          isOpen={true}
          city={cityToModified as City}
          type="modifyCity"
          setDisplayModals={setDisplayModals}
          displayModals={displayModals}
        ></ModalUpdateCity>
      )}
      {isModalOpenAdd && (
        <ModalUpdateCity
          onClose={handleCloseModal}
          isOpen={true}
          city={newCity}
          type="addCity"
          setDisplayModals={setDisplayModals}
          displayModals={displayModals}
        ></ModalUpdateCity>
      )}
    </BackOfficeLayout>
  );
};

export default Cities;
