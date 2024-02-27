import { DataSource } from "typeorm";
import { faker } from "@faker-js/faker";
import { Seeder, SeederFactoryManager } from "typeorm-extension";
import { User, UserRole } from "../entities/User";
import { Poi } from "../entities/Poi";
import { City } from "../entities/City";
import { Category } from "../entities/Category";

export default class MainSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager
  ): Promise<any> {
    const poiRepository = dataSource.getRepository(Poi);
    const { SEED_ADMIN_MAIL, SEED_ADMIN_PASSWORD } = process.env;

    // USERS
    const userFactory = factoryManager.get(User);
    const users = await userFactory.saveMany(10);
    await userFactory.save({
      username: "admin",
      email: SEED_ADMIN_MAIL,
      password: SEED_ADMIN_PASSWORD,
      role: UserRole.ADMIN,
    });

    // CITY
    const cityFactory = factoryManager.get(City);
    const cities = await cityFactory.saveMany(10);
    // CATEGORY
    const CategoryFactory = factoryManager.get(Category);
    const restaurant = await CategoryFactory.save({
      name: "Restaurant",
      image: faker.image.urlLoremFlickr({ category: "activities" }),
    });
    const sport = await CategoryFactory.save({
      name: "Sport",
      image: faker.image.urlLoremFlickr({ category: "activities" }),
    });
    const tourism = await CategoryFactory.save({
      name: "Tourisme",
      image: faker.image.urlLoremFlickr({ category: "activities" }),
    });
    const categories = [restaurant, sport, tourism];

    // POI
    const poiFactory = factoryManager.get(Poi);
    const pois = await Promise.all(
      Array(100)
        .fill("")
        .map(async () => {
          const made = await poiFactory.make({
            user: faker.helpers.arrayElement(users),
            city: faker.helpers.arrayElement(cities),
            category: faker.helpers.arrayElement(categories),
          });
          return made;
        })
    );
    await poiRepository.save(pois);
  }
}
