import styles from "./Table.module.scss";
// import { Category, City, User, Poi, Role } from "../../../../utils/types";
// import { DataType, TableType } from "../../../../utils/types";
// import { useState } from "react";

// const Table = data.map(({ title }: Props) => {

type TableProps = {
	title: string;
};
const Table = ({ title }: TableProps) => {
	return (
		<>
			<p className={styles.bibi}>composant table</p>
			<table>
				{/* boucle for pour adapter le nombre de colonne */}
				<thead>
					<tr>
						<th>{title}</th>
					</tr>
					<tr>
						<th>{title}</th>
					</tr>
					<tr>
						<th>{title}</th>
					</tr>
					<tr>
						<th>{title}</th>
					</tr>
					<tr>
						<th>{title}</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>Marseille</td>
						<td>bibi</td>
						<td>bibi</td>
						<td>User01</td>
						<td>
							<button>edit</button>
							<button>delete</button>
						</td>
					</tr>
				</tbody>
			</table>
		</>
	);
};

export default Table;

// interface Props {
// 	title: string;
// 	data: DataType;
// 	tableType: TableType;
// 	name: string;
// 	// coordinates: Coordinates;
// 	image: string;
// }

// const Table = ({ title, data, tableType }: Props) => {
// 	const isPage = () => {
// 		// const city = TableType.CITY;
// 		// const poi = TableType.POI;
// 		// switch (tableType) {
// 		//     case (city):
// 		//         data[0];
// 		//         break;
// 		//     case (poi):
// 		//         data[1];
// 		//     break;
// 		//     default:
// 		//         break;
// 		// }
// 		if (tableType === TableType.CITY) {
// 			console.log(data[0]);
// 			return data[0];
// 		}
// 	};
// 	return (
// 		<>
// 			<p className={styles.bibi}>composant table</p>
// 			<table>
// 				{/* boucle for pour adapter le nombre de colonne */}
// 				<thead>
// 					<tr>
// 						<th>{title}</th>
// 					</tr>
// 					<tr>
// 						<th>{title}</th>
// 					</tr>
// 					<tr>
// 						<th>{title}</th>
// 					</tr>
// 					<tr>
// 						<th>{title}</th>
// 					</tr>
// 					<tr>
// 						<th>{title}</th>
// 					</tr>
// 				</thead>
// 				<tbody>
// 					<tr>
// 						<td>Marseille</td>
// 						<td>bibi</td>
// 						<td>bibi</td>
// 						<td>User01</td>
// 						<td>
// 							<button>edit</button>
// 							<button>delete</button>
// 						</td>
// 					</tr>
// 				</tbody>
// 			</table>
// 		</>
// 	);
// };
