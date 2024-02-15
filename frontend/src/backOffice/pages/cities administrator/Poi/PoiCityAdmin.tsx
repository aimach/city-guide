/* eslint-disable react-hooks/exhaustive-deps */
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import Title from "../../../components/common/Title/Title";
import BackOfficeLayout from "../../../components/layout/BackOfficeLayout";
import { useState, useEffect, useContext } from "react";
import { City } from "../../../../utils/types";
import { Poi } from "../../../../utils/types";
import { UsersContext } from "../../../../contexts/UserContext";
import styles from "../../administrator/Cities/Cities.module.scss";
import Button from "../../../components/common/Button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Modal from "../../../../components/common/modals/Modal";
import ModalUpdatePoi from "../../../components/modals/ModalUpdatePoi";
import { Link } from "react-router-dom";

import {
  faCheck,
  faX,
  faPen,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";

const PoiCityAdmin = () => {
  // get profile
  const { profile } = useContext(UsersContext);

  // create columns
  const columns = [
    "Nom",
    "Coordonnées GPS",
    "Description",
    "Adresse",
    "Téléphone",
    "Image",
    "Actif",
  ];

  // get cities
  const [adminCity, setAdminCity] = useState<City | null>(null);
  const [poiOfAdminCity, setPoiOfAdminCity] = useState<Poi[]>([]);

  const getAdminCity = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_PUBLIC_BACKEND_URL}/api/cities?userAdminCityId=${profile?.id}`
      );
      const data = await response.json();
      setAdminCity(data[0]);
      setPoiOfAdminCity(data[0].poi);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAdminCity();
  }, []);

  // DELETE POI
  const handleDeletePoi = async (poiToDelete: Poi) => {
    try {
      await fetch(
        `${process.env.REACT_APP_PUBLIC_BACKEND_URL}/api/poi/${poiToDelete.id}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );
      const updatedPoi = poiOfAdminCity.filter(
        (poi) => poi.id !== poiToDelete.id
      );
      setPoiOfAdminCity(updatedPoi);
    } catch (error) {
      console.log("delete error", error);
    }
  };

  //  UPDATE, Modify One Poi
  const [isModalOpenModify, setIsModalOpenModify] = useState<boolean>(false);

  const [poiToModified, setPoiToModified] = useState<Poi | null>(null);

  const handleUpdateOnePoi = (poi: Poi) => {
    setPoiToModified(poi);
    setIsModalOpenModify(true);
  };

  // state for modal management
  const [displayModals, setDisplayModals] = useState<{
    validation: boolean;
    error: boolean;
  }>({
    validation: false,
    error: false,
  });

  // ADDED One Poi
  const [isModalOpenAdd, setIsModalOpenAdd] = useState<boolean>(false);
  const newPoi = {
    name: "",
    coordinates: [0, 0],
    image: "",
    description: "",
    address: "",
    phoneNumber: "",
    isAccepted: false,
    city: adminCity?.id as string,
  };

  // Close Modal for Add and Modify modal
  const handleCloseModal = () => {
    setIsModalOpenModify(false);
    setIsModalOpenAdd(false);
  };

  return (
    <>
      <BackOfficeLayout>
        {displayModals.validation && (
          <Modal
            setDisplayModals={setDisplayModals}
            displayModals={displayModals}
            type="validation"
            setIsModalOpenModify={setIsModalOpenModify}
            isModalOpenModify={isModalOpenModify}
            setIsModalOpenAdd={setIsModalOpenAdd}
            isModalOpenAdd={isModalOpenAdd}
          />
        )}
        <Title name={"Point d'intérêts"} icon={faLocationDot}></Title>
        <div className={styles.titleAndButton}>
          <h4 className={`${styles.subtitleTable} subtitleDashboard`}>
            Liste des POI de {adminCity?.name}
          </h4>
          <Link to="/contribution">
            <div className={styles.buttonText}>Ajouter un POI</div>
          </Link>
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
              <th className={`${styles.titleTable} fieldTableHead`}>
                Modifier
              </th>
              <th className={`${styles.titleTable} fieldTableHead`}>
                Supprimer
              </th>
            </tr>
          </thead>
          <tbody>
            {poiOfAdminCity.map((poi) => {
              return (
                <tr key={poi.id}>
                  <td className={`fieldTableBody`}>{poi.name}</td>
                  <td className={`fieldTableBody`}>
                    <div className={styles.fieldCoordinates}>
                      <span>Lattitude : {poi.coordinates.coordinates[0]}</span>
                      <span>Longitude : {poi.coordinates.coordinates[1]}</span>
                    </div>
                  </td>
                  <td className={`${styles.fieldImage} fieldTableBody`}>
                    {poi.description}
                  </td>
                  <td className={`${styles.fieldImage} fieldTableBody`}>
                    {poi.address}
                  </td>
                  <td className={`${styles.fieldImage} fieldTableBody`}>
                    {poi.phoneNumber}
                  </td>
                  <td className={`${styles.fieldImage} fieldTableBody`}>
                    {poi.image}
                  </td>
                  <td className={`${styles.fieldImage} fieldTableBody`}>
                    <FontAwesomeIcon
                      icon={poi.isAccepted ? faCheck : faX}
                      color={poi.isAccepted ? "green" : "red"}
                    />
                  </td>
                  <td className={styles.titleTable}>
                    <Button
                      icon={faPen}
                      onClick={() => handleUpdateOnePoi(poi)}
                      typeButton={"icon"}
                    />
                  </td>
                  <td className={styles.endColumn}>
                    <Button
                      icon={faTrashCan}
                      onClick={() => handleDeletePoi(poi)}
                      typeButton={"icon"}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {isModalOpenModify && (
          <ModalUpdatePoi
            onClose={handleCloseModal}
            isOpen={true}
            poi={poiToModified as Poi}
            city={adminCity as City}
            type="modifyPoi"
            setDisplayModals={setDisplayModals}
            displayModals={displayModals}
          ></ModalUpdatePoi>
        )}
        {isModalOpenAdd && (
          <ModalUpdatePoi
            onClose={handleCloseModal}
            isOpen={true}
            poi={newPoi}
            type="addPoi"
            city={adminCity as City}
            setDisplayModals={setDisplayModals}
            displayModals={displayModals}
          ></ModalUpdatePoi>
        )}
      </BackOfficeLayout>
    </>
  );
};
export default PoiCityAdmin;
