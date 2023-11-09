import { Faker } from "@faker-js/faker";
import { setSeederFactory } from "typeorm-extension";
import { Poi } from "../entities/Poi";

export const PoiFactory = setSeederFactory(Poi, (faker: Faker) => {
  const poi = new Poi();
  poi.name = faker.lorem.words({
    min: 3,
    max: 6,
  });
  poi.address = faker.location.streetAddress();
  const latitude = faker.number.float({
    min: 41.333,
    max: 51.124,
    precision: 0.000001,
  });
  const longitude = faker.number.float({
    min: -5.142,
    max: 9.561,
    precision: 0.000001,
  });

  poi.coordinates = {
    type: "Point",
    coordinates: [latitude, longitude],
  };
  poi.description = faker.lorem.sentence();
  poi.image = faker.image.urlPicsumPhotos();
  poi.is_accepted = faker.datatype.boolean();

  return poi;
});
