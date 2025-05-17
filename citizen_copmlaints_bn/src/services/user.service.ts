import { sign } from "jsonwebtoken";
import { AppDataSource } from "../database/data-source";
import { User } from "../database/entities/user.entity";
import { hashPassword, verifyPassword } from "../utils/hashPassword";
const userRepo = AppDataSource.getRepository(User);

export class UserService {
  static getAll() {
    return userRepo.find();
  }

  static getById(user_id: number) {
    return userRepo.findOneBy({ user_id });
  }
  static async create(data: Partial<User>) {
    const existingUser = await userRepo.findOne({
      where: { email: data.email },
    });

    if (existingUser) {
      return { error: "User with this email already exists" };
    }
    const hashedPassword = await hashPassword(data.password!);
    const user = userRepo.create({ ...data, password: hashedPassword });
    return await userRepo.save(user);
  }

  static async update(user_id: number, data: Partial<User>) {
    const user = await userRepo.findOneBy({ user_id });
    if (!user) return null;
    if (data.password) {
      data.password = await hashPassword(data.password);
    }

    return await userRepo.save(user);
  }

  static async remove(id: number) {
    const result = await userRepo.delete(id);
    return result.affected ? true : false;
  }

  static async login(email: string, password: string) {
    const user = await userRepo.findOne({
      where: { email },
      select: ["user_id", "firstName", "lastName", "email", "password"],
    });

    if (!user) {
      return { error: "Invalid email or password" };
    }
    console.log("User found:", user);
    const isPasswordValid = await verifyPassword(password, user.password);
    if (!isPasswordValid) {
      return { error: "Invalid email or password" };
    }

    const token = sign(
      { user_id: user.user_id, name: user.lastName, email: user.email },
      process.env.JWT_SECRET!
    );
    return { token };
  }
}
