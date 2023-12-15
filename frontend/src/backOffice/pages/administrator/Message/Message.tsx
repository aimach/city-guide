import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import Title from "../../../components/common/Title/Title";
import BackOfficeLayout from "../../../components/layout/BackOfficeLayout";
import styles from "./Message.module.scss";

const Message = () => {
	return (
		<>
			<BackOfficeLayout>
				<Title icon={faEnvelope} name={"Messages"}></Title>
				<p className={styles.titleMessage}>je suis dans la page message</p>
			</BackOfficeLayout>
		</>
	);
};

export default Message;
