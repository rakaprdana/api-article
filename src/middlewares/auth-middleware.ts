import { NextFunction, Response } from "express";
import { AuthRequest } from "../interface/auth-request";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model";
import { toAPIResponse } from "../format/responses";
import { responses } from "../constants";
import { IUser } from "../interface/user";

export const AuthMiddleware = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  let token: string;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
        id: string;
      };

      const user = await User.findById(decoded.id).select("-password");
      if (!user) {
        res
          .status(404)
          .json(toAPIResponse(404, false, responses.errorNotFound));
      }
      req.user = user as unknown as IUser;
      next();
    } catch (error) {
      res.status(401).json(toAPIResponse(400, false, "Invalid token"));
    }
  } else {
    res
      .status(401)
      .json(
        toAPIResponse(401, false, "Access denied, please check your token")
      );
  }
};
