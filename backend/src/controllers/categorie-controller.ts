import { Request, Response } from 'express';

export const test = (req: Request, res: Response) => {
   try {
      return res.status(200).send('Test réussi');
   } catch (error) {
      console.log(error);
   }
};
