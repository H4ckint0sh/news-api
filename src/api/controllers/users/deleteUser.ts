import { ValidationError } from "#middleware/error-handling.js";
import * as usersModel from "#models/users/index.js";
import { NextFunction, Request, Response } from "express";

export const deleteUser = async (req: Request<{ user_id: string }, unknown, unknown, unknown>, res: Response, next: NextFunction) => {
  try {
    const userId = Number(req.params.user_id);
    if (isNaN(userId)) {
      throw new ValidationError("Invalid userId provided");
    }
    await usersModel.deleteUser(userId);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Delete a user by ID
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the user to delete
 *         example: 1
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User not found
 */
