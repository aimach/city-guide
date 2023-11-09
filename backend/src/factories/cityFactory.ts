import { Faker } from "@faker-js/faker";
import { setSeederFactory } from "typeorm-extension";
import { City } from "../entities/City";
import { User, UserRole } from "../entities/User";
import { seedDataSource } from "../seedDataSource";

export const CityFactory = setSeederFactory(City, async (faker: Faker) => {
  const userRepository = seedDataSource.getRepository(User);
  // Get id of an all admin city users
  const user = new User();
  user.username = faker.internet.userName();
  user.email = faker.internet.email();
  user.password = faker.internet.password();
  user.image = faker.internet.avatar();
  user.city = faker.location.city();
  user.role = UserRole.ADMIN_CITY;

  // Creating fake city data
  const city = new City();
  city.coordinates = {
    type: "Point",
    coordinates: [faker.location.latitude(), faker.location.longitude()],
  };
  city.name = faker.location.city();
  city.image = faker.image.urlLoremFlickr({ category: "city" });
  city.userAdminCity = await userRepository.save(user);

  return city;
});
