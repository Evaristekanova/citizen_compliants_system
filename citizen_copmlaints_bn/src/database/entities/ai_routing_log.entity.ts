import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Column,
  CreateDateColumn,
} from "typeorm";
import { Agency } from "./agency.entity";
import { Complaint } from "./complaint.entity";

@Entity("ai_routing_logs")
export class AIRoutingLog {
  @PrimaryGeneratedColumn()
  log_id: number;

  @ManyToOne(() => Complaint)
  @JoinColumn({ name: "complaint_id" })
  complaint: Complaint;

  @ManyToOne(() => Agency)
  @JoinColumn({ name: "predicted_agency_id" })
  predicted_agency: Agency;

  @Column("float")
  confidence_score: number;

  @Column()
  model_version: string;

  @CreateDateColumn()
  created_at: Date;
}
