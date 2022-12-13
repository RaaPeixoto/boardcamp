import connection from "../database/database.js";
import rentalsSchema from "../models/rentalsSchema.js";

export async function newRentalMiddleware(req,res,next){
    const { customerId,gameId,daysRented} = req.body;
    const isCustomerExists= await connection.query(`SELECT * FROM customers WHERE id='${customerId}';`);
    const game = await  connection.query(`SELECT * FROM games WHERE id = ${gameId};`);
    const rentalsValidation = rentalsSchema.validate(req.body);
 
    if (isCustomerExists.rows.length===0 || rentalsValidation.error|| game.rows.length === 0 || game.rows[0].stockTotal <=0){
        return res.sendStatus(400);
    }
  
   
    next();
}

export async function finishRentalMiddleware(req,res,next){
    const { id } = req.params;
    const rental = await connection.query(`SELECT * FROM rentals WHERE id = $1`, [id]);
    if(rental.rows.length===0){
        return res.sendStatus(404);
    }
    
    if(rental.rows[0].returnDate !== null){
        return res.sendStatus(400);
    }
    next();
}

export async function deleteRentalMiddleware(req,res,next){
    const { id } = req.params;
    const rental = await connection.query(`SELECT * FROM rentals WHERE id = $1`, [id]);
    if(rental.rows.length===0){
        return res.sendStatus(404);
    }
    
   
    next();
}