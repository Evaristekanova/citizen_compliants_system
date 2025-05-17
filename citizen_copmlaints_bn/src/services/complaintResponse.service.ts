import { AppDataSource } from "../database/data-source";
import { ComplaintResponse } from "../database/entities/complaint_response.entity";

export class ComplaintResponseService {
  private static repository = AppDataSource.getRepository(ComplaintResponse);

  static create(data: Partial<ComplaintResponse>) {
    const response = this.repository.create(data);
    return this.repository.save(response);
  }

  static findAll() {
    return this.repository.find({
      relations: ["complaint", "user"],
      order: { created_at: "DESC" },
    });
  }

  static findOne(id: number) {
    return this.repository.findOne({
      where: { response_id: id },
      relations: ["complaint", "user"],
    });
  }

  static async update(id: number, data: Partial<ComplaintResponse>) {
    const existing = await this.repository.findOneBy({ response_id: id });
    if (!existing) return null;
    Object.assign(existing, data);
    return this.repository.save(existing);
  }

  static async delete(id: number) {
    const result = await this.repository.delete(id);
    return result.affected !== 0;
  }
}
