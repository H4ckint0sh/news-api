import { Topic } from "#db/models/topic.model.js";
import * as topicsModel from "#models/topics/index.js";
import { NextFunction, Request, Response } from "express";

export const getTopics = async (_req: Request<unknown, Topic[], unknown, unknown>, res: Response, next: NextFunction): Promise<void> => {
  try {
    const topics = await topicsModel.getTopics();
    res.status(200).send({ topics });
  } catch (error) {
    next(error);
  }
};

/**
 * @swagger
 * /api/topics:
 *   get:
 *     summary: Get all topics
 *     tags: [Topics]
 *     description: Retrieve a list of all topics.
 *     responses:
 *       200:
 *         description: Responds with an array of all topics.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Topic'
 */
