import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./BackOfficeHomePage.module.scss";
import { faHouse } from "@fortawesome/free-solid-svg-icons";

const HomePage = () => {
	return (
		<>
			<div>
				<div className={styles.titleContainer}>
					<FontAwesomeIcon icon={faHouse} className={styles.iconSpaces} />
					<h3>Bienvennue sur le Dashboard Administrateur</h3>
				</div>
				{/* <p>
					Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatem
					aperiam maxime obcaecati laudantium eum quo exercitationem recusandae
					natus corrupti officia reiciendis suscipit voluptas eos dolorem
					maiores fugiat ratione nemo voluptate pariatur repellat laboriosam
					voluptatibus cumque et iure ad veniam in. Pariatur sit, accusantium
					laboriosam inventore quos ad voluptatibus vitae sed reiciendis magnam.
					odio aliquid quas possimus natus repellendus, odit maxime laboriosam
					repudiandae vitae. Voluptatum, tempora dignissimos consequuntur
					nostrum eius a, commodi praesentium inventore fugit impedit at earum,
					facilis aspernatur quo itaque nulla cupiditate deleniti voluptatem.
					Nisi aliquam odit sed laudantium praesentium voluptates doloremque
					delectus vel similique officiis odio, blanditiis libero rerum quaerat
					ex inventore quae! In, voluptatibus minima laboriosam doloremque quas
					blanditiis explicabo ab deleniti distinctio dolorem? Sit id autem
					eligendi quidem eaque molestiae labore voluptas. Tempore tempora esse.
					aperiam delectus veniam officia, accusantium praesentium adipisci?
					Minima sequi temporibus eos beatae ipsa magni possimus repudiandae
					corporis eveniet animi omnis praesentium quas cupiditate placeat,
					perferendis maiores libero mollitia corrupti. Eveniet eligendi atque
					quisquam, voluptas porro explicabo molestiae quod dignissimos
					perferendis iste exercitationem, illum earum soluta nulla accusantium.
				</p> */}
			</div>
		</>
	);
};

export default HomePage;
