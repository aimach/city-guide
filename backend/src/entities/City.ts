import {
   Entity,
   PrimaryColumn,
   Column,
   ManyToMany,
   JoinTable,
   PrimaryGeneratedColumn,
   Point,
} from 'typeorm';

export class City {
   @PrimaryGeneratedColumn()
   id: number;

   @Column({ type: 'varchar', length: 100 })
   name: string;

   @Column({ type: 'geometry' })
   coordinates: Point;

   @Column()
   image: string;
}
