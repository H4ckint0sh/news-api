import { User } from "#db/models/index.js";
import { HttpError, ValidationError } from "#middleware/error-handling.js";
import { generateToken } from "#utils/index.js";
import bcrypt from "bcryptjs";
import { NextFunction, Request, Response } from "express";

export const login = async (
  req: Request<unknown, { auth: boolean; token: string }, { password: string; user_name: string }, string>,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { password, user_name } = req.body;

    console.log("user_name from request:", user_name); // Added logging
    const user = await User.findOne({
      attributes: ["user_id", "password", "role_id"],
      raw: true,
      where: { user_name: user_name },
    });

    console.log("user found:", user); // Added logging

    if (!user) {
      throw new ValidationError("User not found.");
    }

    console.log("user", user);

    const passwordIsValid = bcrypt.compareSync(password, user.password);
    if (!passwordIsValid) {
      throw new HttpError(401, "Invalid password");
    }

    const token = generateToken(user);
    if (!token) {
      throw new HttpError(500, "Failed to generate token");
    }
    res.status(200).send({ auth: true, token });
  } catch (error) {
    next(error);
  }
};

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: User login
 *     description: Authenticates a user and returns a JWT token.
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_name:
 *                 type: string
 *                 description: The user's user_name
 *               password:
 *                 type: string
 *                 description: The user's password
 *     responses:
 *       200:
 *         description: Successful login
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 auth:
 *                   type: boolean
 *                 token:
 *                   type: string
 *       401:
 *         description: Invalid password
 *       404:
 *         description: User not found
 *     security: []  # This route does not require bearer authentication
 */
