/* eslint-disable react-hooks/exhaustive-deps */
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import Title from "../../../components/common/Title/Title";
import BackOfficeLayout from "../../../components/layout/BackOfficeLayout";
import { useState, useEffect } from "react";
import { Poi } from "../../../../utils/types";
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

  const nbOfPoi = 5;

  // get POI
  const [listOfPoi, setListOfPoi] = useState<Poi[]>([]);
  const [pageNb, setPageNb] = useState<number>(1);

  const getAllPoi = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_PUBLIC_BACKEND_URL}/api/poi?nb=${nbOfPoi}&page=${pageNb}`,
        { credentials: "include" }
      );
      const data = await response.json();
      setListOfPoi(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllPoi();
  }, [pageNb]);

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
      const updatedPoi = listOfPoi.filter((poi) => poi.id !== poiToDelete.id);
      setListOfPoi(updatedPoi);
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
    city: "",
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
            Liste des POI
          </h4>
          <Link to="/contribution">
            <div className={styles.buttonText}>Ajouter un POI</div>
          </Link>
        </div>
        <div className={styles.buttonContainer}>
          {pageNb > 1 && (
            <button
              className={styles.buttonText}
              onClick={() => setPageNb(pageNb - 1)}
            >
              Précédent
            </button>
          )}
          {listOfPoi.length === nbOfPoi && (
            <button
              className={styles.buttonText}
              onClick={() => setPageNb(pageNb + 1)}
            >
              Suivant
            </button>
          )}
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
            {listOfPoi.map((poi) => {
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
            setDisplayModals={setDisplayModals}
            displayModals={displayModals}
          ></ModalUpdatePoi>
        )}
      </BackOfficeLayout>
    </>
  );
};
export default PoiCityAdmin;
