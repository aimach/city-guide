import { City } from "./entities/City";
import { User } from "./entities/User";

/**
 * Cette fonction permet d'ajouter des données de test utiles en développement.
 */
export async function seed() {
	const user = new User();
	user.email = "user@example.com";
	user.username = "user";
	user.password = "password";
	user.city = "Lyon";
	await user.save();

	const paris = new City();
	paris.name = "Paris";
	paris.userAdminCity = user;
	paris.image =
		"https://www.thetrainline.com/cms/media/1360/france-eiffel-tower-paris.jpg?mode=crop&width=1080&height=1080&quality=70";
	await paris.save();

	const user2 = new User();
	user2.email = "user2@example.com";
	user2.username = "user2";
	user2.password = "password";
	user2.city = "Lyon";
	await user2.save();

	const user3 = new User();
	user3.email = "user3@example.com";
	user3.username = "user3";
	user3.password = "password";
	user3.city = "Lyon";
	await user3.save();

	const lyon = new City();
	lyon.name = "Lyon";
	lyon.userAdminCity = user2;
	lyon.image =
		"https://www.larousse.fr/encyclopedie/data/images/1314872-Lyon.jpg";
	await lyon.save();

	const marseille = new City();
	marseille.name = "Marseille";
	marseille.userAdminCity = user3;
	marseille.image =
		"https://www.okvoyage.com/wp-content/uploads/2020/03/marseille-france.jpg";
	await marseille.save();
}
