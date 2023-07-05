import {
   Column,
   PrimaryGeneratedColumn,
   Point,
   OneToMany,
   OneToOne,
   JoinColumn,
   Entity,
} from 'typeorm';
import { Poi } from './Poi';
import { User } from './User';

@Entity()
export class City {
   @PrimaryGeneratedColumn('uuid')
   id: string;

   @Column({ type: 'varchar', length: 100 })
   name: string;

   @Column('point')
   coordinates: Point;

   @Column()
   image: string;

   @OneToMany(() => Poi, (poi) => poi.city)
   poi: Poi[];

   @OneToOne(() => User)
   @JoinColumn()
   user_admin_city: User;
}
