import { Document } from "mongoose";
import CommonBaseRepository from "../baseRepository/commonBaseRepository";
import IAdminAuthRepository from "../../interfaces/repository/admin.auth.repository";
import { IAdmin } from "../../interfaces/entities/admin.entity";
import Admin from "../../models/adminModel";

export class AdminAuthRepository
  extends CommonBaseRepository<{ admin: Document & IAdmin }>
  implements IAdminAuthRepository
{
  constructor() {
    super({ admin: Admin });
  }
  async findAdminByEmail(email: string): Promise<IAdmin | null> {
    try {
      const admin = this.findOne("admin", { email })
      return admin;
    } catch (error: unknown) {
      throw error;
    }
  }
}
