import { checkRole } from "#middleware/check-role.js";
import { verifyToken } from "#middleware/verify-token.js";
import express from "express";
const router = express.Router();

import * as articlesController from "#api/controllers/articles/index.js";
import * as authController from "#api/controllers/auth/index.js";
import * as commentsController from "#api/controllers/comments/index.js";
import * as rolesController from "#api/controllers/roles/index.js";
import * as topicsController from "#api/controllers/topics/index.js";
import * as usersController from "#api/controllers/users/index.js";

// * Articles
router.get("/articles", verifyToken, articlesController.getArticles);
// prettier-ignore
router.get( "/articles/:article_id", verifyToken, articlesController.getArticleById,);
// prettier-ignore
router.patch( "/articles/:article_id", verifyToken, checkRole(2), articlesController.updateArticle,);
// prettier-ignore
router.post( "/articles/", verifyToken, checkRole(2), articlesController.createArticle,);
// prettier-ignore
router.delete( "/articles/:article_id", verifyToken, checkRole(2), articlesController.deleteArticle,);

// * Comments
// prettier-ignore
router.get( "/articles/:article_id/comments", verifyToken, commentsController.getCommentsByArticleId,);
// prettier-ignore
router.post( "/articles/:article_id/comments", verifyToken, commentsController.createComment,);
// prettier-ignore
router.delete( "/comments/:comment_id", verifyToken,  commentsController.deleteComment,);
// prettier-ignore
router.patch( "/comments/:comment_id", verifyToken,  commentsController.updateComment,
);

// * Topics
router.get("/topics", verifyToken, topicsController.getTopics);
router.post("/topics", verifyToken, checkRole(2), topicsController.createTopic);

// * Users
router.get("/users", verifyToken, checkRole(2), usersController.getAllUsers);
// prettier-ignore
router.get( "/users/:user_id", verifyToken, usersController.getUserById);
router.post("/users", usersController.createUser);
// prettier-ignore
router.patch( "/users/:user_id", verifyToken, checkRole(2), usersController.updateUser,);
// prettier-ignore
router.delete( "/users/:user_id", verifyToken, checkRole(2), usersController.deleteUser,);

// Roles
router.get("/roles", verifyToken, checkRole(2), rolesController.getAllRoles);
// prettier-ignore
router.get( "/roles/:role_id", verifyToken, checkRole(2), rolesController.getRoleById,);
router.post("/roles", verifyToken, checkRole(2), rolesController.createRole);
// prettier-ignore
router.patch( "/roles/:role_id", verifyToken, checkRole(2), rolesController.updateRole,);
// prettier-ignore
router.delete( "/roles/:role_id", verifyToken, checkRole(2), rolesController.deleteRole,);

// Auth
router.post("/auth/login", authController.login);
router.post("/auth/register", authController.register);

export default router;
