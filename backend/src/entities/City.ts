import {
   Entity,
   PrimaryColumn,
   Column,
   ManyToMany,
   JoinTable,
   PrimaryGeneratedColumn,
   Point,
   OneToMany,
   OneToOne,
   JoinColumn,
} from 'typeorm';
import { Poi } from './Poi';
import { User } from './User';

export class City {
   @PrimaryGeneratedColumn('uuid')
   id: string;

   @Column({ type: 'varchar', length: 100 })
   name: string;

   @Column({ type: 'geometry' })
   coordinates: Point;

   @Column()
   image: string;

   @OneToMany(() => Poi, (poi) => poi.city)
   poi: Poi[];

   @OneToOne(() => User)
   @JoinColumn()
   user_admin_city: User;
}
