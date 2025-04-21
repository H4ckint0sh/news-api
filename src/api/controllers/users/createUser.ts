import { User } from "#db/models/index.js";
import { Role } from "#db/models/index.js";
import { ValidationError } from "#middleware/error-handling.js";
import * as usersModel from "#models/users/index.js";
import { NextFunction, Request, Response } from "express";

export const createUser = async (req: Request<unknown, User, User, unknown>, res: Response, next: NextFunction) => {
  try {
    const { password, role_id, user_name } = req.body;

    if (!user_name || !password || !role_id) {
      throw new ValidationError("Invalid user data provided");
    }
    const existingUser = await User.findOne({ where: { user_name } });
    if (existingUser) {
      throw new ValidationError("Username already exists");
    }
    await Role.findOne({ where: { role_id } });

    const newUser = await usersModel.createUser(req.body);

    res.status(201).send({ newUser });
  } catch (error) {
    next(error);
  }
};
/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Create a new user
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *           example:
 *             user_name: "newuser"
 *             password: "password123"
 *             role_id: 2
 *             name: "John Doe"
 *             avatar_url: "https://example.com/avatar.jpg"
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Bad request, invalid input
 */
