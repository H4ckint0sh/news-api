import { Article } from "#db/models/index.js";
import { ValidationError } from "#middleware/error-handling.js";
import * as articlesModel from "#models/articles/index.js";
import { NextFunction, Request, Response } from "express";

export const updateArticle = async (
  req: Request<{ article_id: string }, Article, { inc_vote: string }, unknown>,
  res: Response,
  next: NextFunction,
) => {
  console.log("inc_vote", req.body.inc_vote);
  try {
    const articleId = Number(req.params.article_id);
    if (isNaN(articleId)) {
      throw new ValidationError("Invalid article id provided");
    }
    const { inc_vote } = req.body;
    const article = await articlesModel.updateArticle(articleId, inc_vote);
    res.status(200).send({ article });
  } catch (error) {
    next(error);
  }
};

/**
 * @swagger
 * /api/articles/{article_id}:
 *   patch:
 *     summary: Update article
 *     tags: [Articles]
 *     description: Update an article with corresponding id.
 *     parameters:
 *       - name: article_id
 *         in: path
 *         description: ID of article to delete
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
 *                 description: The number of votes the article has to be updated
 *     responses:
 *       201:
 *         description: Responds with a newly created article
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Article'
 *       400:
 *         $ref: '#/components/responses/400'
 *       404:
 *         $ref: '#/components/responses/404'
 */
