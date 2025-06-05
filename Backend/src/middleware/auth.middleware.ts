import { NextFunction, Request, Response } from "express";
import { IJWTService } from "../interfaces/common/IJwt";
import { ErrorResponse } from "../utils/responseHandler";

export interface AuthenticatedRequest extends Request {
  id?: string;
}

export default class AuthMiddleware {
  constructor(private _jwtService: IJWTService) {}

  async authenticationToken(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const accessToken = req.cookies.access_token;
      if (!accessToken) {
        return this.handleRefreshToken(req, res, next);
      }
      try {
        const decoded = this._jwtService.verifyAccessToken(accessToken);
        req.id = decoded.id;
        return next();
      } catch {
        return this.handleRefreshToken(req, res, next);
      }
    } catch (error: unknown) {
      ErrorResponse(res, 403, "Invalid token");
      return;
    }
  }

  private async handleRefreshToken(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const refreshToken = req.cookies.refresh_token;
    if (!refreshToken) {
      ErrorResponse(res, 401, "Unauthorized: No token provided");
      return;
    }
    try {
      const decoded = this._jwtService.verifyRefreshToken(refreshToken);
      const payload = {
        id: decoded.id,
        email: decoded.email,
      };
      const newAccessToken = this._jwtService.generateAccessToken(payload);
      res.cookie("access_token", newAccessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 24 * 60 * 60 * 1000, // 1 day
      });
      req.id = decoded.id;
      return next();
    } catch (error: unknown) {
      ErrorResponse(res, 401, "Session expired. Please login again.");
      return;
    }
  }
}
