import connection from "../database/database.js";


export async function getCustomers(req,res) {
  const{cpf} = req.query;
  const{id} = req.params;
    try {
      if(cpf){
        const customer = await connection.query(
          `SELECT * FROM customers WHERE cpf  LIKE $1;`, [cpf+"%"]);
          if(customer.rows.length===0){
            return res.sendStatus(404);
          }
          return res.send(customer.rows);
         
      }
      if(id){
        const customerId = await connection.query(
          `SELECT * FROM customers WHERE id= $1;`, [id]);
          if(customerId.rows.length===0){
            return res.sendStatus(404);
          }
          return res.send(customerId.rows[0]);
      }
      const customers = await connection.query(
        `SELECT * FROM customers;`);
        res.send(customers.rows);
    } catch (err) {
      console.log(err);
      res.sendStatus(404);
    }
  }

  export async function postCustomers(req,res){
    const { name, phone, cpf, birthday } = req.body;
   
    try {

      await connection.query(
        `INSERT INTO customers (name, phone, cpf, birthday ) VALUES ($1,$2,$3,$4)`,
        [name, phone, cpf, birthday ]
      );
    
      res.sendStatus(201);
        } catch (err) {
          console.log(err);
          res.sendStatus(404);
        }
  }

  export async function updateCustomer(req,res){
    const{id} = req.params;
    const { name, phone, cpf, birthday } = req.body; 
   
    try {

      await connection.query(
        `UPDATE customers SET name=$1, phone=$2, cpf=$3, birthday=$4  WHERE id = $5` , [name, phone, cpf, birthday ,id]
       
      );
    
      res.sendStatus(200);
        } catch (err) {
          console.log(err);
          res.sendStatus(404);
        }

 
  }