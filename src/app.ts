import express from "express";
import dotenv from "dotenv";
import ArticleRoute from "./routes/article.route";
import path from "path";

dotenv.config();
const app = express();

app.use(express.json());
app.use("/api/articles", ArticleRoute);
app.use("/uploads", express.static(path.join(__dirname, "...", "uploads")));

export default app;
