import connection from "../database/database.js";

export async function newGameMiddleware(req,res,next){
    const {name,image,stockTotal,categoryId,pricePerDay} = req.body
    const isCategorieExists= await connection.query(`SELECT * FROM categories WHERE id='${categoryId}';`);
    console.log(isCategorieExists.rows)
    const isGameExists= await connection.query(`SELECT * FROM games WHERE name='${name}';`);
    if (!name || !image || stockTotal <= 0 || pricePerDay<= 0||isCategorieExists.rows.length===0){
        return res.sendStatus(400);
    }
    if (isGameExists.rows.length>0){
        return res.sendStatus(409);
    }
   
    next();
}