import express from "express";
import {
  getUser,
  getUserFriends,
  addRemoveFriend,
} from "../controllers/users.js";
import { verifyToken } from "../middleware/auth.js";

const UserRouter = express.Router();

/* READ */
UserRouter.get("/:id", verifyToken, getUser);
UserRouter.get("/:id/friends", verifyToken, getUserFriends);

/* UPDATE */
UserRouter.patch("/:id/:friendId", verifyToken, addRemoveFriend);

export default UserRouter;