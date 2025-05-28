import { User } from "../../models/user";
import { Objetivo } from "../../models/objetivo";

declare global {
  namespace Express {
    interface Request {
      userId?: number;
      user?: User;
    }
  }
}
