/* eslint-disable react-hooks/exhaustive-deps */
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import Title from "../../../components/common/Title/Title";
import BackOfficeLayout from "../../../components/layout/BackOfficeLayout";
import { useState, useEffect, useContext } from "react";
import { City } from "../../../../utils/types";
import { UsersContext } from "../../../../contexts/UserContext";
import styles from "../../administrator/Cities/Cities.module.scss";
import Button from "../../../components/common/Button/Button";
import Checkbox from "../../../components/common/Checkbox/Checkbox";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faCheck,
  faX,
  faPen,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";

const PoiCitiesAdmin = () => {
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
  const getAdminCity = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_PUBLIC_BACKEND_URL}/api/cities?userAdminCityId=${profile?.id}`
      );
      const data = await response.json();
      setAdminCity(data[0]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAdminCity();
  }, []);
  console.log(adminCity);

  return (
    <>
      <BackOfficeLayout>
        <Title name={"Point d'intérêts"} icon={faLocationDot}></Title>
        <div className={styles.titleAndButton}>
          <h4 className={`${styles.subtitleTable} subtitleDashboard`}>
            Liste des POI de ta ville
          </h4>
          <Button
            typeButton="text"
            text="Ajouter un POI"
            onClick={() => console.log("ville")}
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
              <th className={`${styles.titleTable} fieldTableHead`}>
                Modifier
              </th>
              <th className={`${styles.titleTable} fieldTableHead`}>
                Supprimer
              </th>
            </tr>
          </thead>
          <tbody>
            {adminCity?.poi?.map((poi) => {
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
                      onClick={() => {
                        console.log(poi);
                      }}
                      typeButton={"icon"}
                    />
                  </td>
                  <td className={styles.endColumn}>
                    <Button
                      icon={faTrashCan}
                      onClick={() => console.log(poi)}
                      typeButton={"icon"}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </BackOfficeLayout>
    </>
  );
};
export default PoiCitiesAdmin;
