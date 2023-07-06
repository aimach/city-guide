import {
  Entity,
  Column,
  OneToMany,
  ManyToMany,
  JoinTable,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Poi } from "./Poi";
import { City } from "./City";

export enum UserRole {
  ADMIN = "admin",
  ADMIN_CITY = "admin_city",
  FREE_USER = "free_user",
  PREMIUM_USER = "premium_user",
}

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "varchar", length: 100, unique: true })
  username: string;

  @Column({ type: "varchar", length: 100, unique: true })
  email: string;

  @Column({ type: "varchar", length: 100 })
  password: string;

  @Column({ nullable: true })
  image: string;

  @Column({ type: "enum", enum: UserRole, default: UserRole.FREE_USER })
  role: UserRole;

  @Column({ nullable: true, type: "varchar", length: 100 })
  city: string;

  // ajout de la référence du user dans un poi
  @OneToMany(() => Poi, (poi) => poi.user_id)
  createdPoi: Poi[];

  @ManyToMany(() => Poi, (poi) => poi.users_favorite, {
    cascade: true,
    eager: true,
  })
  @JoinTable()
  favouritePoi: Poi[];

  @ManyToMany(() => City, (city) => city.users, { cascade: true, eager: true })
  @JoinTable()
  favouriteCities: City[];
}
