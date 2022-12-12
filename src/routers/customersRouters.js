import {Router} from "express";
import { getCustomers, postCustomers, updateCustomer } from "../controllers/customersController.js";
import { newCustomerMiddleware } from "../middlewares/customersMiddleware.js";
import customerSchema from "../models/customersSchema.js";
const customersRouters = Router();

customersRouters.get("/customers/:id?",getCustomers);
customersRouters.post("/customers",customerSchema,newCustomerMiddleware,postCustomers);
customersRouters.put("/customers/:id",customerSchema,newCustomerMiddleware,updateCustomer);
export default customersRouters;