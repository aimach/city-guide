import { NextFunction, Request, Response } from "express";
import fs from "fs";
import { v4 as uuidv4 } from "uuid";

export const renameFile = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const originalname = req.file?.originalname;
  const filename = req.file?.filename;
  fs.rename(
    `./public/categories/${filename}`,
    `./public/categories/${uuidv4()}-${originalname}`,
    (err) => {
      if (err) throw err;
    }
  );
  req.body.image = `/categories/${uuidv4()}${originalname}`;
  next();
};
