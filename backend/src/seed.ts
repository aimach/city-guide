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
import { seedDataSource } from "./seedDataSource";

seedDataSource.initialize().then(async () => {
  await seedDataSource.synchronize(true);
  await runSeeders(seedDataSource);
  process.exit();
});
