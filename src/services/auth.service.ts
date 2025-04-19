import bcrypt from "bcryptjs";
import { IUser } from "../interface/user";
import { User } from "../models/user.model";
import { generateToken } from "../utils/generateToken";

export class AuthService {
  static signUp = async (data: IUser) => {
    const { username, email, password } = data;
    const userIsExist = await User.findOne({ username });
    if (userIsExist) {
      return { error: "USER_EXITS", userIsExist };
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    if (!newUser) {
      return { error: "CREATED_FAIELD" };
    }

    return {
      _id: newUser.id,
      username: newUser.username,
      email: newUser.email,
      token: generateToken(newUser.id),
    };
  };

  static signIn = async (data: IUser) => {
    const { email, password } = data;
    const user = await User.findOne({ email });

    if (!user || !user.password) return { error: "INVALID_SIGNIN" };

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return { error: "INVALID_PASSWORD" };

    return {
      _id: user.id,
      email: user.email,
      token: generateToken(user.id),
    };
  };
}
