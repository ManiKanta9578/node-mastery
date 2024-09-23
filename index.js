import express from "express"
import router from "./router/route.js";
import dotenv from "dotenv"
import connect from "./database/connection.js";
dotenv.config();


const app = express()
const port = process.env.PORT;

app.get('/', (req, res) => { res.send('Hello World!') });

app.use('/api', router);

connect()
  .then(() => {
    try {
      app.listen(port, () => {
        console.log(`Example app listening on port ${port}`)
      })
    } catch (error) {
      console.log("Cannot connect to the server");
    }
  })
  .catch((err) => console.log("Invalid database connection"))


