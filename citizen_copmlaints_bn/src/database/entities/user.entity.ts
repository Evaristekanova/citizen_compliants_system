import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  ManyToOne,
} from "typeorm";
import { UserType } from "../enums/enums";
import { Agency } from "./agency.entity";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn()
  user_id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  phone: string;

  @Column({
    type: "enum",
    enum: UserType,
  })
  user_type: UserType;

  @Column({ select: false, nullable: false })
  password: string;

  @ManyToOne(() => Agency, { nullable: true })
  @JoinColumn({ name: "agency_id" })
  agency: Agency;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
