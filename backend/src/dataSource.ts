import { DataSource } from "typeorm";
import { User } from "./entities/User";
import { Category } from "./entities/Category";
import { City } from "./entities/City";
import { Poi } from "./entities/Poi";
import { Message } from "./entities/Message";
const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

const dataSource = new DataSource({
  type: "postgres",
  host: DB_HOST,
  port: parseInt(DB_PORT as string, 10),
  username: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,

  synchronize: true,

  entities: [User, Category, City, Poi, Message],
});

export default dataSource;
