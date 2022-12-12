import dotenv from "dotenv";
import pkg from "pg";

const { Pool } = pkg;
dotenv.config();
 const connection = new Pool({
    connectionString: process.env.DATABASE_URL,
  });



  export default connection;