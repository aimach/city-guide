import { Faker } from "@faker-js/faker";
import { setSeederFactory } from "typeorm-extension";
import { Category } from "../entities/Category";

export const CategoryFactory = setSeederFactory(Category, (faker: Faker) => {
  const category = new Category();
  category.name = faker.company.name();
  category.image = faker.image.urlLoremFlickr({ category: "activities" });

  return category;
});
