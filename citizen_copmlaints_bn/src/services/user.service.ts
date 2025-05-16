import { AppDataSource } from "../database/data-source";
import { User } from "../database/entities/user.entity";
import { hashPassword } from "../utils/hashPassword";

const userRepo = AppDataSource.getRepository(User);

export class UserService {
  static getAll() {
    return userRepo.find();
  }

  static getById(id: number) {
    return userRepo.findOneBy({ id });
  }
  static async create(data: Partial<User>) {
    const hashedPassword = await hashPassword(data.password!);
    const user = userRepo.create({ ...data, password: hashedPassword });
    return await userRepo.save(user);
  }

  static async update(id: number, data: Partial<User>) {
    const user = await userRepo.findOneBy({ id });
    if (!user) return null;
  if (data.password) {
    data.password = await hashPassword(data.password);
  }
    userRepo.merge(user, data);
    return await userRepo.save(user);
  }

  static async remove(id: number) {
    const result = await userRepo.delete(id);
    return result.affected ? true : false;
  }
}
