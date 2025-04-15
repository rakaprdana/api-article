import mongoose, { FilterQuery } from "mongoose";
import { IArticle } from "../interface/article";
import { Article } from "../models/article.model";

export class ArticleService {
  static createArticle = async (data: IArticle, imagePath: string[]) => {
    const newItem = new Article({ ...data, image: imagePath });
    return await newItem.save();
  };

  static getArticle = async () => {
    const items = await Article.find({ is_deleted: false });
    return items;
  };

  static getArticleById = async (id: string) => {
    const item = await Article.findById(id);
    return item;
  };

  static updateArticle = async (id: string, updatedData: Partial<IArticle>) => {
    const updated = await Article.findByIdAndUpdate(id, updatedData, {
      new: true,
    });

    return updated;
  };

  static deleteArticle = async (id: string) => {
    const deleted = await Article.findByIdAndUpdate(
      id,
      { is_deleted: true },
      { new: true }
    );
    return deleted;
  };
}
