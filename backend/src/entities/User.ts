import {
   Entity,
   PrimaryColumn,
   Column,
   ManyToMany,
   JoinTable,
   PrimaryGeneratedColumn,
} from 'typeorm';

export enum UserRole {
   ADMIN = 'admin',
   ADMIN_CITY = 'admin_city',
   FREE_USER = 'free_user',
   PREMIUM_USER = 'premium_user',
}

@Entity()
export class User {
   @PrimaryGeneratedColumn('uuid')
   id: string;

   @Column({ type: 'varchar', length: 100, unique: true })
   username: string;

   @Column({ type: 'varchar', length: 100, unique: true })
   email: string;

   @Column()
   password: string;

   @Column()
   image: string;

   @Column({ type: 'enum', enum: UserRole, default: UserRole.FREE_USER })
   role: UserRole;

   @Column({ nullable: true, type: 'varchar', length: 100 })
   city: string;
}
