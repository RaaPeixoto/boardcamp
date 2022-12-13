import connection from "../database/database.js";
import gamesSchema from "../models/gamesSchema.js";

export async function newGameMiddleware(req,res,next){
    const {name,image,stockTotal,categoryId,pricePerDay} = req.body
    const isCategorieExists= await connection.query(`SELECT * FROM categories WHERE id='${categoryId}';`);
    const gameValidation = gamesSchema.validate(req.body);
   if (gameValidation.error||isCategorieExists.rows.length===0){
        return res.sendStatus(400);
    }
    const isGameExists= await connection.query(`SELECT * FROM games WHERE name='${name}';`);
   
    if (isGameExists.rows.length>0){
        return res.sendStatus(409);
    }
   
    next();
}