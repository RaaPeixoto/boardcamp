import connection from "../database/database.js";
export async function newCategorieMiddleware(req,res,next){
    const {name} = req.body
    if (!name){
        return res.sendStatus(400);
    }
    const isCategorieExists= await connection.query(
        `SELECT * FROM categories WHERE name='${name}';`);
        if (isCategorieExists.rows.length>0){
            return res.sendStatus(409);
        }
    next();
}