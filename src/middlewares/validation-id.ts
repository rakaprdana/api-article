import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";

export const validationObjectId = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({
      success: false,
      message: "Invalid ID format, id isn't ObjectId from mongo",
    });
  }

  next();
};
