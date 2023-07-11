import { Column, PrimaryGeneratedColumn, OneToMany, Entity } from "typeorm";
import { Poi } from "./Poi";

@Entity()
export class Category {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "varchar", length: 100, unique: true })
  name: string;

  @Column("text")
  image: string;

  @OneToMany(() => Poi, (poi) => poi.category)
  poi: Poi[];
}
