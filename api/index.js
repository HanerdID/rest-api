import cors from 'cors';
import express from 'express';
import dotenv from 'dotenv';
import UserRoute from '../routes/UserRoute.js';
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(UserRoute);

app.get("/", (req, res) => res.send("Express on Vercel"));

app.listen(3000, () => console.log("Server ready on port 3000."));

module.exports = app;