import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Column,
  CreateDateColumn,
} from "typeorm";
import { Complaint } from "./complaint.entity";

@Entity("complaint_logs")
export class ComplaintLog {
  @PrimaryGeneratedColumn()
  log_id: number;

  @ManyToOne(() => Complaint)
  @JoinColumn({ name: "complaint_id" })
  complaint: Complaint;

  @Column()
  action: string;

  @Column({ type: "jsonb" })
  metadata: object;

  @CreateDateColumn()
  created_at: Date;
}
