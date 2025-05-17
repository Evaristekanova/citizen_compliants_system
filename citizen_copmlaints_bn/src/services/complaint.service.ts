import { AppDataSource } from "../database/data-source";
import { Complaint } from "../database/entities/complaint.entity";

export class ComplaintService {
  private static repo = AppDataSource.getRepository(Complaint);

  static async create(data: Partial<Complaint>) {
    try {
      const complaint = this.repo.create(data);
      return await this.repo.save(complaint);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error:any) {
      throw new Error(`Unable to create complaint: ${error.message}`);
    }
  }

  static async findAll() {
    return this.repo.find({
      relations: ["user", "category", "status", "assigned_agency"],
      order: { created_at: "DESC" },
    });
  }

  static async findOne(id: number) {
    return this.repo.findOne({
      where: { complaint_id: id },
      relations: ["user", "category", "status", "assigned_agency"],
    });
  }

  static async update(id: number, data: Partial<Complaint>) {
    const complaint = await this.findOne(id);
    if (!complaint) return null;
    Object.assign(complaint, data);
    return await this.repo.save(complaint);
  }

  static async delete(id: number) {
    const complaint = await this.findOne(id);
    if (!complaint) return null;
    await this.repo.remove(complaint);
    return true;
  }
}
