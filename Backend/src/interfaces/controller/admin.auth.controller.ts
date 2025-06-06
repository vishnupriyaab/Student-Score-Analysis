import { Request } from "express";

export default interface IAdminAuthController{
    adminLogin(req: Request, res: Response): Promise<void>
}