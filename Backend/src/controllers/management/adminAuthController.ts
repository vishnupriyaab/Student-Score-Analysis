import { Request, Response } from "express";
import IAdminAuthController from "../../interfaces/controller/admin.auth.controller";
import { ErrorResponse, successResponse } from "../../utils/responseHandler";
import IAdminAuthServices from "../../interfaces/service/admin.auth.service";
import { adminAuthService } from "../../services/adminAuthServices";

export class AdminAuthController implements IAdminAuthController {
  private _authService: IAdminAuthServices;
  constructor(authService: IAdminAuthServices) {
    this._authService = authService;
  }

  async adminLogin(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body.loginData;

      if (!email || !password) {
        return ErrorResponse(res, 404, "All fields are required");
      }

      const { accessToken, refreshToken } = await this._authService.adminLogin(
        email,
        password
      );

      console.log(accessToken, refreshToken, "ghjuio");

      res
        .cookie("refresh_token", refreshToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
          maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
        })
        .cookie("access_token", accessToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
          maxAge: 24 * 60 * 60 * 1000, // 1 day
        });
      return successResponse(res, 200, "Admin logged in successfully");
    } catch (error: unknown) {
      if (error instanceof Error) {
        if (error.name === "adminNotFound") {
          ErrorResponse(res, 404, "Admin not found");
          return;
        }
        if (error.name === "passwordIsIncorrect") {
          ErrorResponse(res, 401, "Password is Incorrect");
          return;
        }
        return ErrorResponse(
          res,
          500,
          "An unexpected error occurred during login"
        );
      }
    }
  }

  async adminLogout(req: Request, res: Response): Promise<void> {
    try {
      res
        .clearCookie("refresh_token", {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
        })
        .clearCookie("access_token", {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
        });

      return successResponse(res, 200, "Admin logged out successfully");
    } catch (error:unknown) {
      return ErrorResponse(res, 500, "Error during logout");
    }
  }
}

export const adminAuthController = new AdminAuthController(adminAuthService);
