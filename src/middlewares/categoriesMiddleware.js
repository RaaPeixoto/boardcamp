import connection from "../database/database.js";
import categorySchema from "../models/categorySchema.js";
export async function newCategorieMiddleware(req,res,next){
    const {name} = req.body
    const categoryValidation = categorySchema.validate(req.body);
    if (categoryValidation.error) {
      return res.sendStatus(400);
    }
    const isCategorieExists= await connection.query(
        `SELECT * FROM categories WHERE name='${name}';`);
        if (isCategorieExists.rows.length>0){
            return res.sendStatus(409);
        }
    next();
}