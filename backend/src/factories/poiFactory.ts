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
    min: 43.66886,
    max: 49.7466,
    precision: 0.000001,
  });
  const longitude = faker.number.float({
    min: -1.17146,
    max: 5.77409,
    precision: 0.000001,
  });

  poi.coordinates = {
    type: "Point",
    coordinates: [latitude, longitude],
  };
  poi.description = faker.lorem.sentence();
  poi.image = faker.image.urlPicsumPhotos();
  poi.isAccepted = faker.datatype.boolean();

  return poi;
});
