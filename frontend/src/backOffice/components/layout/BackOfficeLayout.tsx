import { useEffect, type PropsWithChildren, useState } from "react";
import AsideMenu from "../common/AsideMenu";
import Header from "../../../components/common/header/Header";
import styles from "./BackOfficeLayout.module.scss";

export default function BackOfficeLayout({ children }: PropsWithChildren) {
	const [windowSize, setWindowSize] = useState<number>(window.innerWidth);

	function updateDimension() {
		setWindowSize(window.innerWidth);
	}
	useEffect(() => {
		window.addEventListener("resize", updateDimension);
	}, [windowSize]);
	return (
		<>
			<Header size={windowSize > 768 ? "desktop" : "mobile"} />
			<div className={styles.layoutBackOffice}>
				<section className={styles.flexAsideMenu}>
					<AsideMenu />
				</section>
				<section className={styles.flexContent}>
					<div className={styles.backOfficeContent}>{children}</div>
					<div className={styles.footerWave}></div>
				</section>
			</div>
		</>
	);
}
