import { AppDataSource } from "../database/data-source";
import { ComplaintLog } from "../database/entities/complaint_log.entity";

export class ComplaintLogService {
  static async create(data: Partial<ComplaintLog>) {
    const repository = AppDataSource.getRepository(ComplaintLog);
    const log = repository.create(data);
    return repository.save(log);
  }

  static async findAll() {
    return AppDataSource.getRepository(ComplaintLog).find({
      relations: ["complaint"],
      order: { created_at: "DESC" },
    });
  }

  static async findOne(id: number) {
    return AppDataSource.getRepository(ComplaintLog).findOne({
      where: { log_id: id },
      relations: ["complaint"],
    });
  }

  static async delete(id: number) {
    const repo = AppDataSource.getRepository(ComplaintLog);
    const log = await repo.findOneBy({ log_id: id });
    if (!log) return null;
    return repo.remove(log);
  }
}
