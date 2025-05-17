import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { User } from "./user.entity";
import { Category } from "./category.entity";
import { Status } from "./status.entity";
import { Agency } from "./agency.entity";

@Entity("complaints")
export class Complaint {
  @PrimaryGeneratedColumn()
  complaint_id: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: "user_id" })
  user: User;

  @Column()
  title: string;

  @Column("text")
  description: string;

  @ManyToOne(() => Category)
  @JoinColumn({ name: "category_id" })
  category: Category;

  @ManyToOne(() => Status)
  @JoinColumn({ name: "status_id" })
  status: Status;

  @ManyToOne(() => Agency)
  @JoinColumn({ name: "assigned_agency_id" })
  assigned_agency: Agency;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
