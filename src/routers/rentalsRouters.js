import {Router} from "express";
import { deleteRental, getRentals, postFinishRental, postRental } from "../controllers/rentalsController.js";
import { deleteRentalMiddleware, finishRentalMiddleware, newRentalMiddleware } from "../middlewares/rentalsMiddleware.js";

const rentalsRouters = Router();
rentalsRouters.get("/rentals",getRentals);
rentalsRouters.post("/rentals",newRentalMiddleware,postRental);
rentalsRouters.post("/rentals/:id/return",finishRentalMiddleware,postFinishRental);
rentalsRouters.delete("/rentals/:id",deleteRentalMiddleware,deleteRental);
export default rentalsRouters;