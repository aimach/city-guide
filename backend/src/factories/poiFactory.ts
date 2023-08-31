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
  //

  poi.coordinates = {
    type: "Point",
    coordinates: [faker.location.latitude(), faker.location.longitude()],
  };
  poi.description = faker.lorem.sentence();
  poi.image = faker.image.urlPicsumPhotos();
  poi.is_accepted = faker.datatype.boolean();
  //   console.log(poi);

  //   poi.created_at = faker.date.
  //   poi.category
  //   poi.city = faker.location.city();

  return poi;
});
