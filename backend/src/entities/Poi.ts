import {
  Column,
  ManyToMany,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  Entity,
} from "typeorm";
import { Category } from "./Category";
import { City } from "./City";
import { User } from "./User";

@Entity()
export class Poi {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "varchar", length: 100 })
  name: string;

  @Column("float")
  latitude: number;

  @Column("float")
  longitude: number;

  // ajout du type text
  @Column("text")
  description: string;

  // ajout du type text
  @Column("text")
  address: string;

  // ajout du type text
  @Column("text")
  image: string;

  // ajout du type boolean
  @Column("boolean")
  is_accepted: boolean;

  // ajout du type date (comme indiqué dans la doc)
  @CreateDateColumn()
  created_at: Date;

  // ajout du type date (comme indiqué dans la doc)
  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => Category, (category) => category.poi, {
    onDelete: "SET NULL",
  })
  category: Category;

  @ManyToOne(() => City, (city) => city.poi, { onDelete: "CASCADE" })
  city: City;

  @ManyToOne(() => User, (user) => user.createdPoi, { onDelete: "SET NULL" })
  user: User;

  @ManyToMany(() => User, (user) => user.favouritePoi)
  users_favorite: User[];
}
