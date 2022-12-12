import connection from "../database/database.js";

export async function getCategories(req,res) {
  try {
    const categories = await connection.query(
      `SELECT * FROM categories;`);
      res.send(categories.rows);
  } catch (err) {
    console.log(err);
    res.sendStatus(404);
  }
}

export async function postCategories(req,res) {
    try {
        const { name} = req.body;

  await connection.query(
    "INSERT INTO categories (name) VALUES ($1)",
    [name]
  );

  res.sendStatus(201);
    } catch (err) {
      console.log(err);
      res.sendStatus(404);
    }
  }
