import { DataSource } from "typeorm";
import { faker } from "@faker-js/faker";
import { Seeder, SeederFactoryManager } from "typeorm-extension";
import { User } from "../entities/User";
import { Poi } from "../entities/Poi";
import { City } from "../entities/City";
import { Category } from "../entities/Category";

export default class MainSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager
  ): Promise<any> {
    const poiRepository = dataSource.getRepository(Poi);

    // USERS
    const userFactory = factoryManager.get(User);
    const users = await userFactory.saveMany(10);
<<<<<<< HEAD

=======
>>>>>>> 170e4341e9b305fc663f052b28f917061d8c0619
    // CITY
    const cityFactory = factoryManager.get(City);
    const cities = await cityFactory.saveMany(10);
    // CATEGORY
    const CategoryFactory = factoryManager.get(Category);
<<<<<<< HEAD
    const categories = await CategoryFactory.saveMany(3);
    console.log(categories);

    // POI
    const poiFactory = factoryManager.get(Poi);
    const pois = await Promise.all(
      Array(150)
=======
    const categories = await CategoryFactory.saveMany(10);
    // POI
    const poiFactory = factoryManager.get(Poi);
    const pois = await Promise.all(
      Array(40)
>>>>>>> 170e4341e9b305fc663f052b28f917061d8c0619
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
