import { Role } from "#db/models/index.js";
import { ValidationError } from "#middleware/error-handling.js";
import * as rolesModel from "#models/roles/index.js";
import { NextFunction, Request, Response } from "express";

export const getRoleById = async (req: Request<{ role_id: string }, Role, Role, unknown>, res: Response, next: NextFunction) => {
  try {
    const role_id = parseInt(req.params.role_id);

    // Validate ID
    if (isNaN(role_id)) {
      throw new ValidationError("Invalid role ID");
    }

    // Get role (should return null if not found)
    const role = await rolesModel.getRoleById(role_id);

    if (!role.role_id) {
      throw new ValidationError("Role not found"); // More specific error
    }

    res.status(200).json(role);
  } catch (error) {
    next(error);
  }
};

/**
 * @swagger
 * /api/roles/{id}:
 *   get:
 *     summary: Retrieve a single role by ID
 *     tags:
 *       - Roles
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the role to retrieve
 *         example: 1
 *     responses:
 *       200:
 *         description: A single role object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Role'
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Role not found
 */
