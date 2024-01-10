import { Faker } from "@faker-js/faker";
import { setSeederFactory } from "typeorm-extension";
import { Category } from "../entities/Category";

export const CategoryFactory = setSeederFactory(Category, (faker: Faker) => {
  const category = new Category();
  const categories = [
    "Restaurants", 
    "Bar",
    "Hotel",
    "Point de vue",
    "Soirée",
    "Sport",
    "Tourisme",
  ];

  category.name = faker.helpers.arrayElement(categories);

  category.image = faker.image.urlLoremFlickr({ category: "activities" });

  return category;
});
