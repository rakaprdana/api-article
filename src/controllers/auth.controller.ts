import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";
import { toAPIResponse } from "../format/responses";
import { responses } from "../constants";

export class AuthController {
  static signUp = async (req: Request, res: Response) => {
    try {
      const signUp = await AuthService.signUp(req.body);
      if ("error" in signUp) {
        switch (signUp.error) {
          case "USER_ISEXIST":
            res
              .status(400)
              .json(toAPIResponse(400, false, responses.userIsExist));
          case "INVALID_PASSWORD":
            res
              .status(400)
              .json(toAPIResponse(400, false, responses.errorSignUp));
        }
      }
      res
        .status(201)
        .json(toAPIResponse(201, true, responses.successSignUp, ...signUp));
    } catch (error) {}
  };
}
