import { Role } from "#db/models/index.js";
import * as rolesModel from "#models/roles/index.js";
import { NextFunction, Request, Response } from "express";

export const getAllRoles = async (_req: Request<unknown, Role[], unknown, unknown>, res: Response, next: NextFunction) => {
  try {
    const roles = await rolesModel.getAllRoles();
    res.status(200).json(roles);
  } catch (error) {
    next(error);
  }
};

/**
 * @swagger
 * /api/roles:
 *   get:
 *     summary: Retrieve a list of all roles
 *     tags:
 *       - Roles
 *     responses:
 *       200:
 *         description: A list of roles
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Role'
 */
