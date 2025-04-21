import { Role } from "#db/models/index.js";
import { ValidationError } from "#middleware/error-handling.js";
import * as rolesModel from "#models/roles/index.js";
import { isEmptyOrSpaces } from "#utils/isStringEmptyOrNull.js";
import { NextFunction, Request, Response } from "express";

export const createRole = async (req: Request<unknown, Role, Role, unknown>, res: Response, next: NextFunction) => {
  try {
    const { name, status } = req.body;
    if (isEmptyOrSpaces(name) || typeof status !== "boolean") {
      throw new ValidationError("Invalid role data");
    }
    // Check if the role name already exists
    const existingRole = await Role.findOne({
      where: { name: name },
    });
    if (existingRole) {
      throw new ValidationError("Role name already exists");
    }

    const newRole = await rolesModel.createRole(req.body);
    res.status(201).send({ newRole });
  } catch (error) {
    next(error);
  }
};

/**
 * @swagger
 * /api/roles:
 *   post:
 *     summary: Create a new role
 *     tags:
 *       - Roles
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Role'
 *           example:
 *             name: "Admin"
 *             status: true
 *     responses:
 *       201:
 *         description: Role created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Role'
 *       400:
 *         description: Bad request, invalid input
 */
