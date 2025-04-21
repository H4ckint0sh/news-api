import { Comment } from "#db/models/comment.model.js";
import { User } from "#db/models/index.js";
import { HttpError, ValidationError } from "#middleware/error-handling.js";
import * as commentsModel from "#models/comments/index.js";
import { NextFunction, Request, Response } from "express";

export const createComment = async (
  req: Request<{ article_id: string }, Partial<Comment>, { body: string; user: User }, unknown>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const articleId = Number(req.params.article_id);
    if (isNaN(articleId)) {
      throw new ValidationError("Invalid article id provided");
    }

    console.log(req.user);

    if (!req.user) {
      throw new HttpError(401, "Unauthorized");
    }
    const body = req.body.body;

    if (!body) {
      throw new ValidationError("Body is required");
    }
    const user = await User.findOne({ where: { user_id: req.user.user_id } });
    if (!user) {
      //TODO: Is this the right way to handle this?
      throw new HttpError(401, "Unauthorized");
    }
    const newComment = await commentsModel.createComment(articleId, { body: body, user_name: user.user_name });
    res.status(201).send({ newComment });
  } catch (error) {
    next(error);
  }
};

/**
 * @swagger
 * /api/articles/{article_id}/comments:
 *   post:
 *     summary: Post a comment on an article
 *     tags: [Comments]
 *     description: Post a comment on an article
 *     parameters:
 *       - name: article_id
 *         in: path
 *         description: ID of corresponding article
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
 *               user_name:
 *                 type: string
 *                 example: "lurker"
 *                 description: "The user_name of the author of the comment"
 *               body:
 *                 type: string
 *                 example: "cats don't like dogs"
 *                 description: "The body of the comment"
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
