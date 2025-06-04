import { Router } from "express";
import { adminAuthController } from "../controllers/management/adminAuthController";

const adminRouter = Router();
// const iJwtServices: IJWTService = new JWTService()

adminRouter.post('/login',adminAuthController.adminReg.bind(adminAuthController))

export default adminRouter; 