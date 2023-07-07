import { Request, Response } from 'express';
import rateLimit from 'express-rate-limit';

export const limiter = rateLimit({
   windowMs: 5 * 60 * 1000, // 5 minutes
   max: 5,
   message: 'Too many attempts, please try again later.',
   statusCode: 429,
   standardHeaders: true,
   legacyHeaders: false,
   handler: (req: Request, res: Response, next, options) => {
      res.status(options.statusCode).json({ error: options.message });
   },
});
