import { Faker } from "@faker-js/faker";
import { setSeederFactory } from "typeorm-extension";
import { Category } from "../entities/Category";

export const CategoryFactory = setSeederFactory(Category, (faker: Faker) => {
  const category = new Category();
<<<<<<< HEAD
  const categories = [
    "Restaurants, Bar",
    "Hotel",
    "Point de vue",
    "Soirée",
    "Sport",
    "Tourisme",
  ];

  category.name = faker.helpers.arrayElement(categories);

  category.image = faker.image.urlLoremFlickr({ category: "activities" });

=======
  category.name = faker.company.name();
  category.image = faker.image.urlLoremFlickr({ category: "activities" });

>>>>>>> c085a77d2c20bf63a311ad221e3fb9c4010571a8
  return category;
});
