import { Faker } from "@faker-js/faker";
import { setSeederFactory } from "typeorm-extension";
<<<<<<< HEAD
import { User, UserRole } from "../entities/User";
=======
import { User } from "../entities/User";
>>>>>>> c085a77d2c20bf63a311ad221e3fb9c4010571a8

export const UsersFactory = setSeederFactory(User, (faker: Faker) => {
  const user = new User();
  user.username = faker.internet.userName();
  user.email = faker.internet.email();
  user.password = faker.internet.password();
<<<<<<< HEAD
  user.image = faker.internet.avatar();
  user.city = faker.location.city();
  user.role = faker.helpers.arrayElement(Object.values(UserRole));
=======
  user.bio = faker.lorem.paragraph();
  user.image = faker.internet.avatar();
  user.city = faker.location.city();
>>>>>>> c085a77d2c20bf63a311ad221e3fb9c4010571a8

  return user;
});
