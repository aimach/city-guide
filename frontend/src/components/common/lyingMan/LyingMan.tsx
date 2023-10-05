import styles from "./lyingMan.module.scss";

export default function LyingMan() {
  return (
    <div className={`${styles.lyingManContainer}`}>
      <img src="/illu_man_lying.svg" alt="man lying" />
    </div>
  );
}
