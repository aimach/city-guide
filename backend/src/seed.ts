import "reflect-metadata";
import { DataSource, DataSourceOptions } from "typeorm";
import { runSeeders, SeederOptions } from "typeorm-extension";
import { User } from "./entities/User";
import { UsersFactory } from "./factories/userFactory";
import MainSeeder from "./seeder/MainSeeder";
import { Category } from "./entities/Category";
import { City } from "./entities/City";
import { Poi } from "./entities/Poi";
import { PoiFactory } from "./factories/poiFactory";
import { CityFactory } from "./factories/cityFactory";
import { CategoryFactory } from "./factories/categoryFactory";

const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

const options: DataSourceOptions & SeederOptions = {
  type: "postgres",
  host: DB_HOST,
  port: DB_PORT !== undefined ? parseInt(DB_PORT) : 5432,
  username: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,

  synchronize: true,

  entities: [User, Category, City, Poi],
  // additional config options brought by typeorm-extension
  factories: [UsersFactory, PoiFactory, CityFactory, CategoryFactory],
  seeds: [MainSeeder],
};

const dataSource = new DataSource(options);

dataSource
  .initialize()
  .then(async () => {
    await dataSource.synchronize(true);
    await runSeeders(dataSource);
    process.exit();
  })
  .catch((error) => {
    console.error(error);
  });
