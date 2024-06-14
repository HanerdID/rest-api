import cors from 'cors';
import express from 'express';
import dotenv from 'dotenv';
import UserRoute from './routes/UserRoute.js';
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(UserRoute);


app.listen(process.env.PORT, () =>
  console.log("Server is running on port 5000")
);
