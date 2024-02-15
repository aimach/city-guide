import { faFolder } from "@fortawesome/free-solid-svg-icons";
import Title from "../../../components/common/Title/Title";
import BackOfficeLayout from "../../../components/layout/BackOfficeLayout";
import styles from "../Cities/Cities.module.scss";
import { useState, useEffect } from "react";
import { Category } from "../../../../utils/types";
import Modal from "../../../../components/common/modals/Modal";
import Button from "../../../components/common/Button/Button";
import { faPen, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import ModalUpdateCategory from "../../../components/modals/ModalUpdateCategory";

const Categories = () => {
  const columns = ["Nom", "Image"];

  const [categories, setCategories] = useState<Category[]>([]);
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

  // DELETE One City
  const handleDeleteOneCategory = async (categoryToDelete: Category) => {
    try {
      await fetch(
        `${process.env.REACT_APP_PUBLIC_BACKEND_URL}/api/categories/${categoryToDelete.id}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );
      const updateCategories = categories.filter(
        (category) => category.id !== categoryToDelete.id
      );
      setCategories(updateCategories);
      setDisplayModals({ ...displayModals, validation: true });
    } catch (error) {
      console.log("delete error", error);
    }
  };

  //  UPDATE, Modify One City
  const [isModalOpenModify, setIsModalOpenModify] = useState<boolean>(false);

  const [categoryToModify, setCategoryToModified] = useState<Category | null>(
    null
  );

  const handleUpdateOneCategory = (category: Category) => {
    setCategoryToModified(category);
    setIsModalOpenModify(true);
  };

  // ADDED One City
  const [isModalOpenAdd, setIsModalOpenAdd] = useState<boolean>(false);
  const newCategory = {
    name: "",
    image: "",
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
    getCategories();
  }, [isModalOpenAdd, isModalOpenModify]);

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
        <Title name={"Catégories"} icon={faFolder}></Title>
        <div className={styles.titleAndButton}>
          <h4 className={`${styles.subtitleTable} subtitleDashboard`}>
            Liste des catégories
          </h4>
          <Button
            typeButton="text"
            text="Ajouter une catégorie"
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
              <th className={`${styles.titleTable} fieldTableHead`}>
                Modifier
              </th>
              <th className={`${styles.titleTable} fieldTableHead`}>
                Supprimer
              </th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => {
              return (
                <tr key={category.id}>
                  <td className={`fieldTableBody`}>{category.name}</td>
                  <td className={`${styles.fieldImage} fieldTableBody`}>
                    {category.image}
                  </td>
                  <td className={styles.titleTable}>
                    <Button
                      icon={faPen}
                      onClick={() => {
                        handleUpdateOneCategory(category);
                      }}
                      typeButton={"icon"}
                    />
                  </td>
                  <td className={styles.endColumn}>
                    <Button
                      icon={faTrashCan}
                      onClick={() => handleDeleteOneCategory(category)}
                      typeButton={"icon"}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {isModalOpenModify && (
          <ModalUpdateCategory
            onClose={handleCloseModal}
            isOpen={true}
            category={categoryToModify as Category}
            type="modifyCategory"
            setDisplayModals={setDisplayModals}
            displayModals={displayModals}
          ></ModalUpdateCategory>
        )}
        {isModalOpenAdd && (
          <ModalUpdateCategory
            onClose={handleCloseModal}
            isOpen={true}
            category={newCategory}
            type="addCategory"
            setDisplayModals={setDisplayModals}
            displayModals={displayModals}
          ></ModalUpdateCategory>
        )}
      </BackOfficeLayout>
    </>
  );
};
export default Categories;
