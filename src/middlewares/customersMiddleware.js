import connection from "../database/database.js";
import customerSchema from "../models/customersSchema.js";
export async function newCustomerMiddleware(req, res, next) {
  const { cpf} = req.body;
  const userValidation = customerSchema.validate(req.body);
  if (userValidation.error) {
    return res.sendStatus(400);
  }
const customerExists = await connection.query(`SELECT * FROM customers WHERE cpf='${cpf}';`);
if (customerExists.rows.length>0){
    return res.sendStatus(409);
}
  next();
}

export async function updateCustomerMiddleware(req, res, next){
  const { cpf} = req.body;
  const{id} = req.params;
  const userValidation = customerSchema.validate(req.body);
  if (userValidation.error) {
    return res.sendStatus(400);
  }

  const customerExists = await connection.query(`SELECT * FROM customers WHERE cpf='${cpf}';`);

  if (id !== customerExists.rows[0].id.toString()){
      return res.sendStatus(409);
  }
    next();
}
  