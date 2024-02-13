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

import * as dotenv from "dotenv";
dotenv.config();

// Accès aux variables d'environnement
const DB_HOST: string = process.env.DB_HOST as string;
const DB_PORT: number = parseInt(process.env.DB_PORT as string, 10);
const DB_USER: string = process.env.DB_USER as string;
const DB_PASSWORD: string = process.env.DB_PASSWORD as string;
const DB_NAME: string = process.env.DB_NAME as string;
const SEED_HOST: string = process.env.SEED_HOST as string;
const FRONTEND_URL: string = process.env.FRONTEND_URL as string;
const DEPLOY_URL: string = process.env.DEPLOY_URL as string;
const BACK_PORT: number = parseInt(process.env.BACK_PORT as string, 10);

// Vérification des variables
if (
  DB_HOST === "" ||
  DB_PORT === 0 ||
  DB_USER === "" ||
  DB_PASSWORD === "" ||
  DB_NAME === "" ||
  SEED_HOST === "" ||
  FRONTEND_URL === "" ||
  DEPLOY_URL === "" ||
  BACK_PORT === 0
) {
  console.error("Certaines variables d'environnement ne sont pas définies.");
  process.exit(1);
}

console.log(process.env);

const options: DataSourceOptions & SeederOptions = {
  type: "postgres",
  host: SEED_HOST,
  port: DB_PORT,
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

const start = async (): Promise<void> => {
  await dataSource.initialize();
  await dataSource.synchronize(true);
  await runSeeders(dataSource);
  process.exit();
};

void start();
