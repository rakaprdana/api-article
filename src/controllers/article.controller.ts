import { Request, response, Response } from "express";
import { Article } from "../models/article.model";
import { responses } from "../constants";
import mongoose from "mongoose";
import { ArticleService } from "../services/article.service";

export class ArticleController {
  static newArticle = async (req: Request, res: Response) => {
    try {
      const imagePaths = (req.files as Express.Multer.File[]).map((file) =>
        file.path.replace(/\\/g, "/")
      );
      const newItem = await ArticleService.createArticle(req.body, imagePaths);
      res.status(201).json({
        success: true,
        message: responses.successCreateItem,
        newItem,
      });
    } catch (error: unknown) {
      if (error instanceof mongoose.Error.ValidationError) {
        const message = Object.values(error.errors).map((err) => {
          err.message;
        });
        res.status(400).json({
          success: false,
          message: responses.errorCreateItem,
          error: message,
        });
      }
      res.status(500).json({
        success: false,
        message: responses.serverError,
        error: error,
      });
    }
  };

  static getArticle = async (req: Request, res: Response) => {
    try {
      const item = await ArticleService.getArticle();
      if (item.length === 0) {
        res.status(404).json({
          success: false,
          message: responses.errorNotFound,
        });
        return;
      }
      res.status(200).json({
        success: true,
        message: responses.successGetItem,
        count: item.length,
        articles: item,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: responses.serverError,
        error: error,
      });
    }
  };

  static getArticleById = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const item = await ArticleService.getArticleById(id);
      if (!item) {
        res.status(404).json({
          success: false,
          message: responses.errorNotFound,
        });
      }

      res.status(200).json({
        success: true,
        message: responses.successGetItem,
        article: item,
      });
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({
          success: false,
          message: responses.errorUpdateItem,
          error: error.message,
        });
      }
      res.status(500).json({
        success: false,
        message: responses.serverError,
        error: error,
      });
    }
  };

  static updatedArticle = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const item = await ArticleService.updateArticle(id, req.body);
      if (!item) {
        res.status(404).json({
          success: false,
          message: responses.errorNotFound,
        });
      }

      res.status(201).json({
        success: true,
        message: responses.successUpdateItem,
        data: item,
      });
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({
          success: false,
          message: responses.errorUpdateItem,
          error: error.message,
        });
      }

      res.status(500).json({
        success: false,
        message: responses.serverError,
        error: error,
      });
    }
  };

  static deletedArticle = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const item = await ArticleService.deleteArticle(id);
      if (!item) {
        res.status(404).json({
          success: false,
          message: responses.errorNotFound,
        });
      }

      res.status(201).json({
        success: true,
        message: responses.successDeleteItem,
        data: item,
      });
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({
          success: false,
          message: responses.errorDeleteItem,
          error: error.message,
        });
      }

      res.status(500).json({
        succes: false,
        message: responses.serverError,
        error: error,
      });
    }
  };
}
