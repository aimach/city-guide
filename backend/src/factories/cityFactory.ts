import { Faker } from "@faker-js/faker";
import { setSeederFactory } from "typeorm-extension";
import { City } from "../entities/City";

export const CityFactory = setSeederFactory(City, async (faker: Faker) => {
  // Creating fake city data
  const city = new City();
  city.coordinates = {
    type: "Point",
    coordinates: [faker.location.latitude(), faker.location.longitude()],
  };
  city.name = faker.location.city();
  city.image = faker.image.urlLoremFlickr({ category: "city" });

  return city;
});
