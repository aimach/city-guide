import {
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToMany,
  OneToOne,
  JoinColumn,
  Entity,
} from "typeorm";
import { Poi } from "./Poi";
import { User } from "./User";

@Entity()
export class City {
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
  image: string;

  @OneToMany(() => Poi, (poi) => poi.city)
  poi: Poi[];

  @ManyToMany(() => User, (user) => user.favouriteCities)
  users: User[];

  @OneToOne(() => User, { onDelete: "SET NULL" })
  @JoinColumn()
  user_admin_city: User;
}
