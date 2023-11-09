import { FaqItem, faqItems } from "../../constants/faq";
import styles from "./faqPage.module.scss";

const groupBySection = (items: FaqItem[]) => {
  return items.reduce((acc, item) => {
    acc[item.section] = acc[item.section] || [];
    acc[item.section].push(item);
    return acc;
  }, {} as Record<string, FaqItem[]>);
};

const capitalizeFirstLetter = (string: any) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const FaqPage = () => {
  const groupedFaqItems = groupBySection(faqItems);
  const sectionKeys = Object.keys(groupedFaqItems);

  return (
    <div className={styles.faqPage}>
      <h1>FAQ</h1>
      {sectionKeys.map((sectionKey) => {
        // Capitalise la première lettre de chaque mot dans la section
        const sectionDisplay = sectionKey
          .split(/(?=[A-Z])/)
          .map(capitalizeFirstLetter)
          .join(" ");

        return (
          <section key={sectionKey} id={sectionKey}>
            <div className={styles.faqHeader}>{sectionDisplay}</div>
            <div className={styles.faqBody}>
              {groupedFaqItems[sectionKey].map((item, index) => (
                <details key={index}>
                  <summary>{item.question}</summary>
                  <p>{item.answer}</p>
                </details>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
};

export default FaqPage;
