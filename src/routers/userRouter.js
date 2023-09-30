import express from "express";
import {
  postEdit,
  getEdit,
  getChangePassword,
  postChangePassword,
  logout,
  see,
  startGithubLogin,
  finishGithubLogin,
} from "../controllers/userController";
import {
  protectorMiddleware,
  publicOnMiddleware,
  avatarUpload,
} from "../middlewares";

const userRouter = express.Router();

userRouter.get("/logout", protectorMiddleware, logout);
userRouter
  .route("/edit")
  .all(protectorMiddleware)
  .get(getEdit)
  .post(avatarUpload.single("avatar"), postEdit);
userRouter
  .route("/change-password")
  .all(protectorMiddleware)
  .get(getChangePassword)
  .post(postChangePassword);
userRouter.get("/github/start", publicOnMiddleware, startGithubLogin);
userRouter.get("/github/finish", publicOnMiddleware, finishGithubLogin);
userRouter.get("/:id([0-9a-f]{24})", see);

export default userRouter;
