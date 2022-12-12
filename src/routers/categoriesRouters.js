import {Router} from "express";
import { getCategories, postCategories } from "../controllers/categoriesController.js";
import { newCategorieMiddleware } from "../middlewares/categoriesMiddleware.js";

const categoriesRouter = Router();

categoriesRouter.get("/categories",getCategories);
categoriesRouter.post("/categories",newCategorieMiddleware,postCategories);

export default categoriesRouter;