interface Props {
  title: string;
  paragraph: string | null;
}

const ModalContent = ({ title, paragraph }: Props) => {
  return (
    <>
      {title && <h3>{title}</h3>}
      {paragraph && <p>{paragraph}</p>}
    </>
  );
};

export default ModalContent;
