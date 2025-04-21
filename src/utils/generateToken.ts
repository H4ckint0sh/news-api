import { User as UserModel } from "#db/models/index.js";
import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.SECRET_KEY; // Provide a default

export function generateToken(user: UserModel) {
  if (!SECRET_KEY) {
    return null; // Or throw an error, depending on your error handling strategy
  }
  return jwt.sign(
    {
      name: user.name,
      role_id: user.role_id,
      user_id: user.user_id,
      user_name: user.user_name,
    },
    SECRET_KEY,
    { expiresIn: "1h" },
  );
}
