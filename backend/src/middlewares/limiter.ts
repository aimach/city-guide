import { Request, Response } from 'express';
import rateLimit from 'express-rate-limit';

export const limiter = rateLimit({
   windowMs: 1 * 60 * 1000,
   max: 5,
   message: 'Trop de tentatives, veuillez réessayer plus tard.',
   statusCode: 429,
   standardHeaders: true,
   legacyHeaders: false,
   handler: (req: Request, res: Response, next, options) => {
      res.status(options.statusCode).json({ error: options.message });
   },
});
