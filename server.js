import express from "express"
import router from "./routes/authRoutes.js";
import dotenv from "dotenv"
import connect from "./config/db.js";
import cors from 'cors';
dotenv.config();


const app = express();
const port = process.env.PORT;


/**middlewares */
app.use(express.json());
app.use(cors());
// app.use(morgan('tiny'));
app.disable('x-powered-by');

app.get('/', (req, res) => { res.send('Hello World!') });

app.use('/api', router);

connect()
  .then(() => {
    try {
      app.listen(port, '0.0.0.0', () => {
        console.log(`TaskFlow app listening on port ${port}`)
      })
    } catch (error) {
      console.log("Cannot connect to the server");
    }
  })
  .catch((err) => console.log("Invalid database connection"))


