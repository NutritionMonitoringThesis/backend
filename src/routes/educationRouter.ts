import { Router } from "express";
import { getAllArticle } from "../controller/educationArticleController";
import { checkToken } from "../middleware/security/checkToken";

export const articleRoute = Router()

articleRoute
    .route('/')
        .get(checkToken, getAllArticle)
            