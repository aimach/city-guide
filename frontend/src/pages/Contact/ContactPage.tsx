import { useState } from "react";
import styles from "./contactPage.module.scss";
import { IoMdPaperPlane } from "react-icons/io";

const ContactPage = () => {
  const [title, setTitle] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log({ title, email, message });
    setSubmitSuccess(true);
  };

  return (
    <div className={styles.contactPage}>
      <div className={styles.contactHeader}>
        <h1>Contact</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed, cum
          quasi labore ad, minus perspiciatis vel deserunt saepe laborum porro
          nemo dicta placeat. Vel nisi sunt neque quaerat at delectus.
        </p>
      </div>

      <form onSubmit={handleSubmit} className={styles.contactForm}>
        <div className={styles.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="title">Titre</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={10}
          ></textarea>
        </div>
        <button type="submit" className={styles.submitButton}>
          Envoyer
          <IoMdPaperPlane className={styles.iconPlane} />
        </button>
        {submitSuccess && (
          <p className={styles.submitMessage}>
            Votre message sera traité dans les plus brefs délais.
          </p>
        )}
      </form>
    </div>
  );
};

export default ContactPage;
