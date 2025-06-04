import { Request, Response } from "express";
import IAdminAuthController from "../../interfaces/controller/admin.auth.controller";
import Admin from "../../models/adminModel";
import bcrypt from "bcrypt";

export class AdminAuthController implements IAdminAuthController{

    async adminReg(req:Request, res:Response):Promise<void>{
        console.log(req.body.loginData,"wertyuiop")
        const { email, password } = req.body.loginData;

            // const saltRounds = 10;
            // const hashedPassword = await bcrypt.hash(password, saltRounds);
            // const newAdmin = new Admin({
            //     email,
            //     password: hashedPassword
            // });
            // const savedAdmin = await newAdmin.save();
            // console.log(savedAdmin,"savedadmin!!")
    }
}

export const adminAuthController = new AdminAuthController()