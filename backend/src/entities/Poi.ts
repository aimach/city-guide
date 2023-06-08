import {
   Entity,
   PrimaryColumn,
   Column,
   ManyToMany,
   JoinTable,
   PrimaryGeneratedColumn,
   Point,
   CreateDateColumn,
   UpdateDateColumn,
   ManyToOne,
} from 'typeorm';
import { Category } from './Category';
import { City } from './City';
import { User } from './User';

export class Poi {
   @PrimaryGeneratedColumn('uuid')
   id: string;

   @Column({ type: 'varchar', length: 100, unique: true })
   name: string;

   @Column({ type: 'geometry', unique: true })
   coordinates: Point;

   @Column()
   description: string;

   @Column()
   address: string;

   @Column()
   image: string;

   @CreateDateColumn()
   created_at: string;

   @UpdateDateColumn()
   updated_at: string;

   @ManyToOne(() => Category, (category) => category.poi)
   category: Category;

   @ManyToOne(() => City, (city) => city.poi)
   city: City;

   @ManyToMany(() => User, (user) => user.favouritePoi)
   users: User[];
}
