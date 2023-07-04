import { DataSource } from "typeorm";
import { User } from "./models/User";
import { Category } from "./models/Category";
import { City } from "./models/City";

const dataSource = new DataSource({
  type: "postgres",
  host: "postgres",
  port: 5432,
  username: "postgres",
  password: "example",
  database: "postgres",

  synchronize: true,

  entities: [User, Category, City],
});

export default dataSource;
