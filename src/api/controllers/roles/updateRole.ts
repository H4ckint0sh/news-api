import { Role } from "#db/models/index.js";
import { ValidationError } from "#middleware/error-handling.js";
import * as roleModel from "#models/roles/index.js";
import { hasValidMember } from "#utils/hasValidMember.js";
import { NextFunction, Request, Response } from "express";

export const updateRole = async (req: Request<{ role_id: string }, Role, Partial<Role>, unknown>, res: Response, next: NextFunction) => {
  try {
    const role_id = parseInt(req.params.role_id);
    if (isNaN(role_id)) {
      throw new ValidationError("Invalid role id");
    }

    if (
      !hasValidMember(req.body, {
        name: "string",
        status: false,
      })
    ) {
      throw new ValidationError("Invalid role data provided");
    }

    const updatedRole = await roleModel.updateRole(role_id, req.body);
    res.status(200).send(updatedRole);
  } catch (error) {
    next(error);
  }
};

/**
 * @swagger
 * /api/roles/{id}:
 *   patch:
 *     summary: Update a role by ID
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
 *         description: The ID of the role to update
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Role'
 *           example:
 *             name: "Updated Role"
 *             status: false
 *     responses:
 *       200:
 *         description: Role updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Role'
 *       400:
 *         description: Bad request, invalid input
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Role not found
 */
