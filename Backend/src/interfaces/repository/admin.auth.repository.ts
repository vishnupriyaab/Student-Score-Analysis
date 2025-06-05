import { IAdmin } from "../entities/admin.entity";

export default interface IAdminAuthRepository{
    findAdminByEmail(email: string): Promise<IAdmin | null>
}