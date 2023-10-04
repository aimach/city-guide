import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const auth = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const token = req.cookies.jwt;
    const decodedToken = jwt.verify(
      token,
      process.env.TOKEN as string
    ) as jwt.JwtPayload;
    req.params.userId = decodedToken.userId;
    next();
  } catch (error) {
    res.status(401).send({ error: "You must be logged in" });
  }
};
