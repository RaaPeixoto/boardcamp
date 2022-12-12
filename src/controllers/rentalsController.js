import dayjs from "dayjs";
import connection from "../database/database.js";

export async function getRentals(req, res) {
  const { customerId, gameId } = req.query;
  try {
    if (customerId) {
      const customerRentals = await connection.query(
        `
            SELECT rentals.*, customers.name  AS "customerName", games.name AS "gameName", games."categoryId" AS "categoryId", categories."name" AS "categoryName"
    FROM 
      rentals
    JOIN 
        customers
    ON 
      rentals."customerId" = customers.id
      JOIN 
      games
  ON 
    rentals."gameId" = games.id 
    JOIN 
    categories
    ON 
    games."categoryId" = categories.id
            
            WHERE "customerId" = $1;`,
        [customerId]
      );
      const customerRentalsRes = customerRentals.rows.map((r) =>
        rentalObject(r)
      );
      return res.send(customerRentalsRes);
    }
    if (gameId) {
      const gameRentals = await connection.query(
        ` SELECT rentals.*, customers.name  AS "customerName", games.name AS "gameName", games."categoryId" AS "categoryId", categories."name" AS "categoryName"
            FROM 
              rentals
            JOIN 
                customers
            ON 
              rentals."customerId" = customers.id
              JOIN 
              games
          ON 
            rentals."gameId" = games.id 
            JOIN 
            categories
            ON 
            games."categoryId" = categories.id
             WHERE "gameId" = $1;`,
        [gameId]
      );
      const gameRentalsRes = gameRentals.rows.map((r) =>
      rentalObject(r)
    );
      return res.send(gameRentalsRes);
    }
    const allRentals = await connection.query(
      /*  `SELECT * FROM rentals;` */

      `SELECT rentals.*, customers.name  AS "customerName", games.name AS "gameName", games."categoryId" AS "categoryId", categories."name" AS "categoryName"
    FROM 
      rentals
    JOIN 
        customers
    ON 
      rentals."customerId" = customers.id
      JOIN 
      games
  ON 
    rentals."gameId" = games.id 
    JOIN 
    categories
    ON 
    games."categoryId" = categories.id
      ;`
    );

    const allRentalsRes = allRentals.rows.map((r) => rentalObject(r));
    res.send(allRentalsRes);
  } catch (err) {
    console.log(err);
    res.sendStatus(404);
  }
}

export async function postRental(req, res) {
  const { customerId, gameId, daysRented } = req.body;
  const rentDate = dayjs().format("YYYY-MM-DD");
  const game = await connection.query(
    `SELECT * FROM games WHERE id = ${gameId};`
  );
  const gamePricePerDay = game.rows[0].pricePerDay;
  const originalPrice = daysRented * gamePricePerDay;
  try {
    await connection.query(
      `INSERT INTO rentals ( "customerId","gameId","daysRented", "rentDate", "returnDate","originalPrice","delayFee") VALUES ($1,$2,$3,$4,$5,$6,$7)`,
      [customerId, gameId, daysRented, rentDate, null, originalPrice, null]
    );

    res.sendStatus(201);
  } catch (err) {
    console.log(err);
    res.sendStatus(404);
  }
}

function rentalObject(rental) {
  const {
    id,
    customerId,
    gameId,
    rentDate,
    daysRented,
    returnDate,
    originalPrice,
    delayFee,
    customerName,
    gameName,
    categoryId,
    categoryName,
  } = rental;

  return {
    id,
    customerId,
    gameId,
    rentDate,
    daysRented,
    returnDate,
    originalPrice,
    delayFee,
    customer: {
      id: customerId,
      name: customerName,
    },
    game: {
      id: gameId,
      name: gameName,
      categoryId,
      categoryName,
    },
  };
}

export async function postFinishRental(req,res){
    const { id } = req.params;
    try{
    let delayFee =0;
    const newReturnDate= dayjs().format("YYYY-MM-DD");
    const rental= await connection.query(`SELECT * FROM rentals WHERE id = $1`, [id]);
    const rentDate= rental.rows[0].rentDate;
    const daysRented= rental.rows[0].daysRented;
    const milisecondsFinishRent= new Date().getTime() - new Date(rentDate).getTime();

    const daysFinishRent = Math.floor(milisecondsFinishRent/ (24 * 3600 * 1000));
    if (daysFinishRent>daysRented) {
        const feeDays = daysFinishRent - daysRented
        delayFee = feeDays * rental.rows[0].originalPrice;
      
    }
    await connection.query(
        `
        UPDATE rentals 
        SET "returnDate" = $1, "delayFee" = $2
        WHERE id = $3   
      `,
        [dayjs().format("YYYY-MM-DD"),delayFee, id]
      );
      res.sendStatus(200);

}catch (err) {
    console.log(err);
    res.sendStatus(404);
  }
  
}

export async function deleteRental(req,res){
    const { id } = req.params;

    try {
        await connection.query(

            `DELETE FROM rentals WHERE id = $1`,[id]
        )
        res.sendStatus(200);
    }catch (err) {
    console.log(err);
    res.sendStatus(404);
  }
}