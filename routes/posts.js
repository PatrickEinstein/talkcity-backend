import express from "express";
import { getFeedPosts, getUserPosts, likePost } from "../controllers/posts.js";
import { verifyToken } from "../middleware/auth.js";

const PostRouter = express.Router();

/* READ */
PostRouter.get("/", verifyToken, getFeedPosts);
PostRouter.get("/:userId/posts", verifyToken, getUserPosts);

/* UPDATE */
PostRouter.patch("/:id/like", verifyToken, likePost);

export default PostRouter;