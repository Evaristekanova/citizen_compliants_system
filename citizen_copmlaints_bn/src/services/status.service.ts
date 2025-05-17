import { AppDataSource } from "../database/data-source";
import { Status } from "../database/entities/status.entity";

export class StatusService {
  private static statusRepository = AppDataSource.getRepository(Status);

  static async create(data: Partial<Status>) {
    try {
      const status = this.statusRepository.create(data);
      return await this.statusRepository.save(status);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error:any) {
      throw new Error(`Unable to create status: ${error.message}`);
    }
  }

  static async findAll() {
    return this.statusRepository.find();
  }

  static async findOne(id: number) {
    return this.statusRepository.findOne({ where: { status_id: id } });
  }

  static async update(id: number, data: Partial<Status>) {
    const status = await this.findOne(id);
    if (!status) return null;
    Object.assign(status, data);
    return await this.statusRepository.save(status);
  }

  static async delete(id: number) {
    const status = await this.findOne(id);
    if (!status) return null;
    await this.statusRepository.remove(status);
    return true;
  }
}
