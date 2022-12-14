import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import categoriesRouter from "./routers/categoriesRouters.js";
import gamesRouters from "./routers/gamesRouters.js";
import customersRouters from "./routers/customersRouters.js";
import rentalsRouters from "./routers/rentalsRouters.js";

const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());
app.use(categoriesRouter);
app.use(gamesRouters);
app.use(customersRouters);
app.use(rentalsRouters);






const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Server running in port: ${port}`));