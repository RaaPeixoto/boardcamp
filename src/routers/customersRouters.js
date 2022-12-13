import {Router} from "express";
import { getCustomers, postCustomers, updateCustomer } from "../controllers/customersController.js";
import { newCustomerMiddleware, updateCustomerMiddleware } from "../middlewares/customersMiddleware.js";
import customerSchema from "../models/customersSchema.js";
const customersRouters = Router();

customersRouters.get("/customers/:id?",getCustomers);
customersRouters.post("/customers",newCustomerMiddleware,postCustomers);
customersRouters.put("/customers/:id", /* customerSchema  , */updateCustomerMiddleware, updateCustomer);
export default customersRouters;