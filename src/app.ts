import express, { Application, Request, Response } from "express";
import cors from "cors";
import cookiParser from "cookie-parser";
import cookieParser from "cookie-parser";
import { authRoutes } from "./app/modules/Auth/auth.routes";
import globalError from "./app/middlewares/globalErrors";
import { movieRoutes } from "./app/modules/Movie/movie.routes";
import { reviewRoutes } from "./app/modules/Review/review.routes";
import { commentRoutes } from "./app/modules/Comments/comment.routes";
import { likeRoutes } from "./app/modules/Like/like.routes";
import { watchlistRoutes } from "./app/modules/WatchLists/watchlist.routes";
const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.get("/", (req: Request, res: Response) => {
  res.send({ message: "Welcome to cone-world-backend" });
});
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/movie", movieRoutes);
app.use("/api/v1/review", reviewRoutes);
app.use("/api/v1/comment", commentRoutes);
app.use("/api/v1/like", likeRoutes);
app.use("/api/v1/watchlist", watchlistRoutes);
app.use(globalError);
export default app;
