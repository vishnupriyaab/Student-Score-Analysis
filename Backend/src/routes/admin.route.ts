import { Router } from "express";
import { adminAuthController } from "../controllers/management/adminAuthController";
import { JWTService } from "../integration/jwtServices";
import { IJWTService } from "../interfaces/common/IJwt";
import AuthMiddleware from "../middleware/auth.middleware";

const adminRouter = Router();
const iJwtServices: IJWTService = new JWTService();
const adminAuthMiddleware = new AuthMiddleware(iJwtServices);

// privateRoute
adminRouter.post(
  "/login",
  adminAuthController.adminLogin.bind(adminAuthController)
);

// protectedRoute
adminRouter.post(
  "/logOut",
  adminAuthMiddleware.authenticationToken.bind(adminAuthMiddleware),
  adminAuthController.adminLogout.bind(adminAuthController)
);

export default adminRouter;
