import connection from "../database/database.js";

export async function getGames(req,res) {
    const {name} = req.query
  
  try {
    if(name) {
      const queryGames= await connection.query(
        `SELECT * FROM games WHERE lower(name) LIKE $1;`, [name.toLowerCase() + "%"] 
    /*   `SELECT games.id, games.name, games.image, games."stockTotal", games."categoryId", games."pricePerDay", categories.name AS "categoryName" 
      FROM 
        games
        WHERE name LIKE $1
      JOIN 
        categories
      ON 
        games."categoryId" = categories.id;`,[name + "%"] */
      
      ); 
      
    
      return res.send(queryGames.rows);
    }
    const games = await connection.query(
        `SELECT games.id, games.name, games.image, games."stockTotal", games."categoryId", games."pricePerDay", categories.name AS "categoryName" 
        FROM 
          games
        JOIN 
          categories
        ON 
          games."categoryId" = categories.id;`); 
      res.send(games.rows);
  } catch (err) {
    console.log(err);
    res.sendStatus(404);
  }
}



 

export async function postGame(req,res){
    const {name,image,stockTotal,categoryId,pricePerDay} = req.body;
    try {

  await connection.query(
    `INSERT INTO games (name,image,"stockTotal","categoryId","pricePerDay") VALUES ($1,$2,$3,$4,$5)`,
    [name,image,stockTotal,categoryId,pricePerDay]
  );

  res.sendStatus(201);
    } catch (err) {
      console.log(err);
      res.sendStatus(404);
    }

}