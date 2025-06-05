import { JWTService } from "../integration/jwtServices";
import { IJWTService } from "../interfaces/common/IJwt";
import IAdminAuthRepository from "../interfaces/repository/admin.auth.repository";
import IAdminAuthServices from "../interfaces/service/admin.auth.service";
import { AdminAuthRepository } from "../repositories/entities/adminAuthRepository";
import bcrypt from "bcrypt";

export class AdminAuthServices implements IAdminAuthServices {
  private _adminRepo: IAdminAuthRepository;
  private _IjwtSevice: IJWTService;
  constructor(adminRepo: IAdminAuthRepository) {
    this._adminRepo = adminRepo;
    this._IjwtSevice = new JWTService();
  }
  async adminLogin(
    email: string,
    password: string
  ): Promise<{ accessToken: string; refreshToken: string }> {
    try {
      console.log(email, password, "datas");

      const admin = await this._adminRepo.findAdminByEmail(email);
      console.log(admin, "admin");
      if (!admin) {
        const error = new Error("Admin not found");
        error.name = "adminNotFound";
        throw error;
      }
      
      const isValid = await bcrypt.compare(password, admin.password);
      console.log(isValid,"isValidddd")
      if (!isValid) {
        const error = new Error("Password is incorrect");
        error.name = "passwordIsIncorrect";
        throw error;
      }
      const payload = {
        id: admin._id,
        email: admin.email,
      };
      const accessToken = this._IjwtSevice.generateAccessToken(payload);
      const refreshToken = this._IjwtSevice.generateRefreshToken(payload);
      console.log(accessToken, refreshToken);
      return {
        accessToken,
        refreshToken,
      };
    } catch (error: unknown) {
      throw error;
    }
  }
}

const adminAuthRepository = new AdminAuthRepository();
export const adminAuthService = new AdminAuthServices(adminAuthRepository);
