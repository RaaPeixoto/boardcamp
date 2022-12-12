import connection from "../database/database.js";

export async function newCustomerMiddleware(req, res, next) {
  const { cpf} = req.body;

const customerExists = await connection.query(`SELECT * FROM customers WHERE cpf='${cpf}';`);
if (customerExists.rows.length>0){
    return res.sendStatus(409);
}
  next();
}

