import type { PropsWithChildren } from "react";
import AsideMenu from "../common/AsideMenu";
import Header from "../common/Header";
// import Footer from "../common/Footer";

// import React, { PropsWithChildren, useEffect, useState } from "react";

import styles from "./BackOfficeLayout.module.scss";

export default function BackOfficeLayout({ children }: PropsWithChildren) {
	// const [windowSize, setWindowSize] = useState<number>(window.innerWidth);

	// function updateDimension() {
	// 	setWindowSize(window.innerWidth);
	// }
	// useEffect(() => {
	// 	window.addEventListener("resize", updateDimension);
	// }, [windowSize]);
	return (
		<>
			<Header />
			<div className={styles.layoutBackOffice}>
				<section className={styles.flexAsideMenu}>
					<AsideMenu />
				</section>
				<section className={styles.backOfficeContent}>
					{children}
					{/* <Footer /> */}
				</section>
			</div>
		</>
	);
}
