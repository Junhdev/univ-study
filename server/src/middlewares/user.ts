import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';
import { User } from "../entities/User";

export default async (req: Request, res: Response, next: NextFunction) => {
    try{
        const token = req.cookies.token;
      
        if(!token) return next();
  
        const { userId }: any = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findOneBy({ userId });
     
        if(!user) throw new Error("Unauthenticated");

        res.locals.user = user;
        
        return next();
    } catch (error) {
        console.log(error);
        return res.status(400).json({ error: "Something went wrong" });
    }
}