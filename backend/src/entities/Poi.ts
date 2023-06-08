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
} from 'typeorm';

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
}
