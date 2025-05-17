import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
} from "typeorm";
import { ComplaintStatus } from "../enums/enums";

@Entity("statuses")
export class Status {
  @PrimaryGeneratedColumn()
  status_id: number;

  @Column({
    type: "enum",
    enum: ComplaintStatus,
    unique: true,
  })
  name: ComplaintStatus;
}
