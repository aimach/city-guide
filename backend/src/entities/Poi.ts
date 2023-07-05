import {
   Column,
   ManyToMany,
   PrimaryGeneratedColumn,
   Point,
   CreateDateColumn,
   UpdateDateColumn,
   ManyToOne,
   Entity,
} from 'typeorm';
import { Category } from './Category';
import { City } from './City';
import { User } from './User';

@Entity()
export class Poi {
   @PrimaryGeneratedColumn('uuid')
   id: string;

   @Column({ type: 'varchar', length: 100, unique: true })
   name: string;

   @Column('point')
   coordinates: Point;

   @Column()
   description: string;

   @Column()
   address: string;

   @Column()
   image: string;

   @Column()
   is_accepted: boolean;

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
