import {
   Column,
   ManyToMany,
   PrimaryGeneratedColumn,
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

   @Column({ type: 'varchar', length: 100 })
   name: string;

   @Column({ type: 'geometry' }) // insert/update : enter [x, y]
   coordinates:
      | string
      | {
           type: string;
           coordinates: number[];
        };

   @Column('text')
   description: string;

   @Column('text')
   address: string;

   @Column('text', { nullable: true })
   phoneNumber: string;

   @Column('text')
   image: string;

   @Column('boolean')
   isAccepted: boolean;

   @CreateDateColumn()
   created_at: Date;

   @UpdateDateColumn()
   updated_at: Date;

   @ManyToOne(() => Category, (category) => category.poi, {
      onDelete: 'SET NULL',
   })
   category: Category;

   @ManyToOne(() => City, (city) => city.poi, { onDelete: 'SET NULL' })
   city: City;

   @ManyToOne(() => User, (user) => user.createdPoi, { onDelete: 'SET NULL' })
   user: User;

   @ManyToMany(() => User, (user) => user.favouritePoi)
   users_favorite: User[];
}
