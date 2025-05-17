import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from "typeorm";
import { Agency } from "./agency.entity";

@Entity("categories")
export class Category {
  @PrimaryGeneratedColumn()
  category_id: number;

  @Column({ unique: true })
  name: string;

  @Column("text")
  description: string;

  @ManyToMany(() => Agency, (agency) => agency.categories)
  agencies: Agency[];
}
