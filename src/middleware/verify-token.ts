import { User } from "#db/models/index.js";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

import { HttpError } from "./error-handling.js";

const SECRET_KEY = process.env.SECRET_KEY; // Provide a default

export function verifyToken(req: Request, res: Response, next: NextFunction): void {
  const token = req.headers.authorization;
  if (!token) {
    throw new HttpError(401, "Authentication required");
  }

  const tokenParts = token.split(" ");
  if (tokenParts.length !== 2 || tokenParts[0] !== "Bearer") {
    throw new HttpError(401, "Invalid token format.");
  }
  // Ensure required environment variables are set
  if (!SECRET_KEY) {
    throw new Error("PG_DATABASE is not set in environment variables");
  }

  jwt.verify(tokenParts[1], SECRET_KEY, (err, decoded) => {
    if (err || !decoded) {
      return res.status(401).json({ message: "Failed to authenticate token." });
    }

    req.user = decoded as User; // Assign the decoded user to the request object
    next();
  });
}
