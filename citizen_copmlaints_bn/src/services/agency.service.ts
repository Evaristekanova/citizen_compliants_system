/* eslint-disable @typescript-eslint/no-explicit-any */
import { AppDataSource } from "../database/data-source";
import { Agency } from "../database/entities/agency.entity";

export class AgencyService {
  private static agencyRepository = AppDataSource.getRepository(Agency);

  static async create(data: Partial<Agency>) {
    try {
      const agency = this.agencyRepository.create(data);
      return await this.agencyRepository.save(agency);
    } catch (error: any) {
      throw new Error(`Unable to create agency: ${error.message}`);
    }
  }

  static async findAll() {
    return this.agencyRepository.find({ relations: ["categories"] });
  }

  static async findOne(id: number) {
    return this.agencyRepository.findOne({
      where: { agency_id: id },
      relations: ["categories"],
    });
  }

  static async update(id: number, data: Partial<Agency>) {
    const agency = await this.findOne(id);
    if (!agency) return null;
    Object.assign(agency, data);
    return await this.agencyRepository.save(agency);
  }

  static async delete(id: number) {
    const agency = await this.findOne(id);
    if (!agency) return null;
    await this.agencyRepository.remove(agency);
    return true;
  }
}
