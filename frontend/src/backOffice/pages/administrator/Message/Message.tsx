import React, { useEffect, useState } from "react";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { IoPencil, IoTrash } from "react-icons/io5";
import Title from "../../../components/common/Title/Title";
import BackOfficeLayout from "../../../components/layout/BackOfficeLayout";
import styles from "./Message.module.scss";
import Table from "../../../components/common/Table/Table";

interface IMessage {
  id: string;
  email: string;
  title: string;
  message: string;
}

const Message: React.FC = () => {
  const columnTitles = ["Email", "Titre", "Message"];
  const [messages, setMessages] = useState<IMessage[]>([]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/contact");

        if (!response.ok) {
          throw new Error(`Erreur HTTP : ${response.status}`);
        }

        // Vérification du type de contenu de la réponse
        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new TypeError("La réponse n'est pas du JSON valide !");
        }

        // Parsing de la réponse JSON
        const data: IMessage[] = await response.json();
        setMessages(data);
      } catch (error) {
        console.error("Erreur lors de la récupération des messages :", error);
        // Gérer l'erreur ici (par exemple, mettre à jour l'état pour afficher une notification à l'utilisateur)
      }
    };
    fetchMessages();
  }, []);

  const renderColumns: ((message: IMessage) => React.ReactNode)[] = [
    (message) => message.email,
    (message) => message.title,
    (message) => message.message,
  ];

  // Ici, définissez les fonctions de gestion pour les événements de mise à jour et de suppression
  const handleUpdateMessage = (message: IMessage) => {
    /* ... */
  };
  const handleDeleteMessage = async (message: IMessage) => {
    try {
    } catch (e) {
      console.log("erreur");
    }
  };

  return (
    <BackOfficeLayout>
      <Title icon={faEnvelope} name={"Messages"} />

      <Table<IMessage>
        renderColumns={renderColumns}
        data={messages}
        columnTitles={columnTitles}
        // onUpdate={handleUpdateMessage}
        onDelete={handleDeleteMessage}
      />
    </BackOfficeLayout>
  );
};

export default Message;
