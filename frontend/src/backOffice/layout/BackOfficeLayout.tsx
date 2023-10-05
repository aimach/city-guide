import type { PropsWithChildren } from "react";
// import "./BackOfficeLayout.scss";

export default function BackOfficeLayout({ children }: PropsWithChildren) {
	return (
		<>
			<div>
				Backoffice layout
				{children}
			</div>
		</>
	);
}
