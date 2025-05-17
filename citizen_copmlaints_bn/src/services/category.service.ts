import { AppDataSource } from "../database/data-source";
import { Category } from "../database/entities/category.entity";
import { Repository } from "typeorm";

const categoryRepo: Repository<Category> =
  AppDataSource.getRepository(Category);

export class CategoryService {
  static async create(data: Partial<Category>) {
    const existing = await categoryRepo.findOneBy({ name: data.name });
    if (existing) throw new Error("Category with this name already exists");

    const category = categoryRepo.create(data);
    return await categoryRepo.save(category);
  }

  static async findAll() {
    return await categoryRepo.find({ relations: ["agencies"] });
  }

  static async findOne(category_id: number) {
    return await categoryRepo.findOne({
      where: { category_id },
      relations: ["agencies"],
    });
  }

  static async update(category_id: number, data: Partial<Category>) {
    const category = await categoryRepo.findOneBy({ category_id });
    if (!category) return null;

    categoryRepo.merge(category, data);
    return await categoryRepo.save(category);
  }

  static async delete(category_id: number) {
    const result = await categoryRepo.delete(category_id);
    return result.affected === 1;
  }
}
