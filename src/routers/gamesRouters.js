import {Router} from "express";
import { getGames, postGame } from "../controllers/gamesController.js";
import { newGameMiddleware } from "../middlewares/gamesMiddleware.js";
const gamesRouters = Router();

gamesRouters.get("/games",getGames);
gamesRouters.post("/games",newGameMiddleware,postGame);
export default gamesRouters;