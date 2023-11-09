import { DataSourceOptions, DataSource } from "typeorm";
import { SeederOptions } from "typeorm-extension";
import { Category } from "./entities/Category";
import { City } from "./entities/City";
import { Poi } from "./entities/Poi";
import { User } from "./entities/User";
import { CategoryFactory } from "./factories/categoryFactory";
import { CityFactory } from "./factories/cityFactory";
import { PoiFactory } from "./factories/poiFactory";
import { UsersFactory } from "./factories/userFactory";
import MainSeeder from "./seeder/MainSeeder";

const options: DataSourceOptions & SeederOptions = {
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "example",
  database: "postgres",

  synchronize: true,

  entities: [User, Category, City, Poi],
  // additional config options brought by typeorm-extension
  factories: [UsersFactory, PoiFactory, CityFactory, CategoryFactory],
  seeds: [MainSeeder],
};

export const seedDataSource = new DataSource(options);
export default seedDataSource;
