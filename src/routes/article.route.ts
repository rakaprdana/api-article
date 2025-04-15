import { Router } from "express";
import { ArticleController } from "../controllers/article.controller";
import { validationObjectId } from "../middlewares/validation-id";
import upload from "../multer";

const route = Router();

route.get("/", ArticleController.getArticle);
route.post("/", upload.array("image", 5), ArticleController.newArticle);
route.get("/:id", validationObjectId, ArticleController.getArticleById);
route.put("/:id", validationObjectId, ArticleController.updatedArticle);
route.delete("/:id", validationObjectId, ArticleController.deletedArticle);

export default route;
