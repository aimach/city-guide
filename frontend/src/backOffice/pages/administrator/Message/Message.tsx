import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import Title from "../../../components/common/Title/Title";
import BackOfficeLayout from "../../../components/layout/BackOfficeLayout";
import styles from "./Message.module.scss";
import { useState, useEffect } from "react";
import { Message } from "../../../../utils/types";
import Modal from "../../../../components/common/modals/Modal";
import Button from "../../../components/common/Button/Button";
import { faTrashCan, faReply } from "@fortawesome/free-solid-svg-icons";

const MessagePage = () => {
  const columns = ["Email", "Titre", "Contenu"];

  const [messages, setMessages] = useState<Message[]>([]);

  const getMessages = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_PUBLIC_BACKEND_URL}/api/contact`,
        { credentials: "include" }
      );
      const data = await response.json();
      setMessages(data);
    } catch (error) {
      console.log(error);
    }
  };

  // DELETE one message
  const handleDeleteOneMessage = async (messageToDelete: Message) => {
    try {
      await fetch(
        `${process.env.REACT_APP_PUBLIC_BACKEND_URL}/api/contact/${messageToDelete.id}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );
      const updateMessages = messages.filter(
        (message) => message.id !== messageToDelete.id
      );
      setMessages(updateMessages);
      setDisplayModals({ ...displayModals, validation: true });
    } catch (error) {
      console.log("delete error", error);
    }
  };

  // state for modal management
  const [displayModals, setDisplayModals] = useState<{
    validation: boolean;
    error: boolean;
  }>({
    validation: false,
    error: false,
  });

  const [isModalOpenModify, setIsModalOpenModify] = useState<boolean>(false);
  const [isModalOpenAdd, setIsModalOpenAdd] = useState<boolean>(false);

  useEffect(() => {
    getMessages();
  }, []);

  const handleReponseMessage = (message: Message) => {
    window.location.href = `mailto:${message.email}?subject=Réponse à ${message.title}`;
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
        <Title icon={faEnvelope} name={"Messages"}></Title>
        <div className={styles.titleAndButton}>
          <h4 className={`${styles.subtitleTable} subtitleDashboard`}>
            Liste des messages
          </h4>
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
                Répondre
              </th>
              <th className={`${styles.titleTable} fieldTableHead`}>
                Supprimer
              </th>
            </tr>
          </thead>
          <tbody>
            {messages.map((message) => {
              return (
                <tr key={message.id}>
                  <td className={`fieldTableBody`}>{message.email}</td>
                  <td className={`fieldTableBody`}>
                    {message.title.slice(0, 20)}...
                  </td>
                  <td className={`${styles.fieldImage} fieldTableBody`}>
                    {message.message.slice(0, 20)}...
                  </td>
                  <td className={styles.titleTable}>
                    <Button
                      icon={faReply}
                      onClick={() => handleReponseMessage(message)}
                      typeButton={"icon"}
                    />
                  </td>
                  <td className={styles.endColumn}>
                    <Button
                      icon={faTrashCan}
                      onClick={() => handleDeleteOneMessage(message)}
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

export default MessagePage;
