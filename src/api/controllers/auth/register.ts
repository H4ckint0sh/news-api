import { UserQuery } from "#api/controllers/types.js";
import { User } from "#db/data/types.js";
import * as models from "#db/models/index.js";
import { ValidationError } from "#middleware/error-handling.js";
import { generateToken } from "#utils/index.js";
import { NextFunction, Request, Response } from "express";

export const register = async (req: Request<{ id: string }, unknown, User, UserQuery>, res: Response, next: NextFunction) => {
  try {
    const { password, role_id, user_name } = req.body;

    if (!user_name || !password || !role_id) {
      throw new ValidationError("Username, password, and role ID are required.");
    }

    const role = await models.Role.findByPk(role_id);
    if (!role) {
      throw new ValidationError("Role not found.");
    }

    const existingUser = await models.User.findOne({
      raw: true,
      where: { user_name: user_name },
    });
    if (existingUser) {
      throw new ValidationError("Username already exists.");
    }

    const newUser = await models.User.create(req.body);

    const token = generateToken(newUser);
    res.status(201).send({ auth: true, token });
  } catch (error) {
    next(error);
  }
};

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: Endpoints for user registration and login.
 */

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     description: Creates a new user in the system.
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
 *               role_id:
 *                 type: integer
 *                 description: The ID of the role assigned to the user
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 auth:
 *                   type: boolean
 *                 token:
 *                   type: string
 *       400:
 *         description: Missing user_name, password, or role ID
 *       404:
 *         description: Role not found
 *     security: []  # This route does not require bearer authentication
 */
