import { User } from "#db/models/index.js";
import { Role } from "#db/models/index.js";
import { ValidationError } from "#middleware/error-handling.js";
import * as usersModel from "#models/users/index.js";
import { hasValidMember } from "#utils/hasValidMember.js";
import { NextFunction, Request, Response } from "express";

export const updateUser = async (req: Request<{ user_id: string }, User, User>, res: Response, next: NextFunction) => {
  try {
    const userId = parseInt(req.params.user_id);
    if (isNaN(userId)) {
      throw new ValidationError("Invalid user id provided");
    }

    if (
      !hasValidMember(req.body, {
        avatar_url: "string",
        name: "string",
        password: "string",
        role_id: 0,
        user_name: "string",
      })
    ) {
      throw new ValidationError("Invalid user data provided");
    }

    if (req.body.user_name) {
      const existingUser = await User.findOne({ where: { user_name: req.body.user_name } });
      if (!existingUser) {
        throw new ValidationError("Username already exists");
      }
    }

    if (req.body.role_id) {
      const role = await Role.findByPk(req.body.role_id);
      if (!role) {
        throw new ValidationError("Role not found");
      }
    }

    const updatedUser = await usersModel.updateUser(userId, req.body);

    res.status(200).json(updatedUser);
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
