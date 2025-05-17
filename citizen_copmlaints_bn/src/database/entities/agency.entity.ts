import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinTable,
  ManyToMany,

} from "typeorm";
import { Category } from "./category.entity";

@Entity("agencies")
export class Agency {
  @PrimaryGeneratedColumn()
  agency_id: number;

  @Column()
  name: string;

  @Column("text")
  description: string;

  @Column("text")
  contact_info: string;

  @ManyToMany(() => Category, (category) => category.agencies)
  @JoinTable({ name: "agency_category" })
  categories: Category[];
}
