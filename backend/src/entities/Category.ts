import {
   Entity,
   PrimaryColumn,
   Column,
   ManyToMany,
   JoinTable,
   PrimaryGeneratedColumn,
   OneToMany,
} from 'typeorm';
import { Poi } from './Poi';

export class Category {
   @PrimaryGeneratedColumn('uuid')
   id: string;

   @Column({ type: 'varchar', length: 100, unique: true })
   name: string;

   @Column()
   image: string;

   @OneToMany(() => Poi, (poi) => poi.category)
   poi: Poi[];
}
