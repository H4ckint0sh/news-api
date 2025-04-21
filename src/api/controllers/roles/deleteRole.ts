import { ValidationError } from "#middleware/error-handling.js";
import * as roleModel from "#models/roles/index.js";
import { NextFunction, Request, Response } from "express";

export const deleteRole = async (req: Request<{ role_id: string }, unknown, unknown, unknown>, res: Response, next: NextFunction) => {
  try {
    const role_id = Number(req.params.role_id);
    if (isNaN(role_id)) {
      throw new ValidationError("Invalid article id provided");
    }
    await roleModel.deleteRole(role_id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

/**
 * @swagger
 * /api/roles/{id}:
 *   delete:
 *     summary: Delete a role by ID
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
 *         description: The ID of the role to delete
 *         example: 1
 *     responses:
 *       200:
 *         description: Role deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Role not found
 */
