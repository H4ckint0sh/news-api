import { ValidationError } from "#middleware/error-handling.js";
import * as commentsModel from "#models/comments/index.js";
import { NextFunction, Request, Response } from "express";

interface ReqBody {
  inc_vote: number;
}

export const updateComment = async (req: Request<{ comment_id: string }, unknown, ReqBody>, res: Response, next: NextFunction) => {
  try {
    const commentId = Number(req.params.comment_id);
    const { inc_vote } = req.body;

    if (typeof inc_vote !== "number" || isNaN(commentId)) {
      throw new ValidationError("Bad request");
    }

    const updatedComment = await commentsModel.updateComment(commentId, inc_vote);
    res.status(200).send({ updatedComment });
  } catch (error) {
    next(error);
  }
};

/**
 * @swagger
 * /api/comments/{comment_id}:
 *   patch:
 *     summary: Update a comment's votes on an article
 *     tags: [Comments]
 *     description: Update a comment on an article
 *     parameters:
 *       - name: comment_id
 *         in: path
 *         description: ID of corresponding comment
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               inc_vote:
 *                 type: integer
 *                 description: The number of votes the comment has to be updated
 *     responses:
 *       201:
 *         description: Responds with a newly created comment
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Comment'
 *       400:
 *         $ref: '#/components/responses/400'
 *       404:
 *         $ref: '#/components/responses/404'
 */
