import { Article } from "#db/models/index.js";
import { ValidationError } from "#middleware/error-handling.js";
import * as articlesModel from "#models/articles/index.js";
import { NextFunction, Request, Response } from "express";

export const getArticleById = async (req: Request<{ article_id: string }, unknown, Article, unknown>, res: Response, next: NextFunction) => {
  try {
    const articleId = Number(req.params.article_id);
    if (isNaN(articleId)) {
      throw new ValidationError("Invalid article id provided");
    }
    const article = await articlesModel.getArticleById(articleId);
    res.status(200).send({ article });
  } catch (error) {
    next(error);
  }
};

/**
 * @swagger
 * /api/articles/{article_id}:
 *   get:
 *     summary: Get article by article_id
 *     tags: [Articles]
 *     description: Retrieve an article with the corresponding id.
 *     parameters:
 *       - name: article_id
 *         in: path
 *         description: ID of article to return
 *         required: true
 *         schema:
 *           type: integer
 *           format: int64
 *     responses:
 *       200:
 *         description: Responds with an article with the corresponding id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Article'
 *       400:
 *         $ref: '#/components/responses/400'
 *       404:
 *         $ref: '#/components/responses/404'
 */
