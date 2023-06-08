import {
   Entity,
   PrimaryColumn,
   Column,
   ManyToMany,
   JoinTable,
   PrimaryGeneratedColumn,
} from 'typeorm';

export class Category {
   @PrimaryGeneratedColumn('uuid')
   id: string;

   @Column({ type: 'varchar', length: 100, unique: true })
   name: string;

   @Column()
   image: string;
}
