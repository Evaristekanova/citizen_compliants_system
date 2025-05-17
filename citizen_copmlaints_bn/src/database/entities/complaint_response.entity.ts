import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Column, CreateDateColumn } from "typeorm";
import { Complaint } from "./complaint.entity";
import { User } from "./user.entity";

@Entity("complaint_responses")
export class ComplaintResponse {
  @PrimaryGeneratedColumn()
  response_id: number;

  @ManyToOne(() => Complaint)
  @JoinColumn({ name: "complaint_id" })
  complaint: Complaint;

  @ManyToOne(() => User)
  @JoinColumn({ name: "user_id" })
  user: User;

  @Column("text")
  message: string;

  @CreateDateColumn()
  created_at: Date;
}
