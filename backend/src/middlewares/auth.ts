import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export const auth = (req: Request, res: Response, next: NextFunction) => {
   try {
      const token = req.cookies.token;
      console.log(token);
      jwt.verify(token, process.env.TOKEN as string) as jwt.JwtPayload;
      if (!token) {
         throw res.status(403).send('Error');
      }
      next();
   } catch (error) {
      res.status(401).send({ error: 'You must be logged in' });
   }
};
