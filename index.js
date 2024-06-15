import cors from "cors";
import express from "express";
import dotenv from "dotenv";
import UserRoute from "./routes/UserRoute.js";
import AuthRoute from "./routes/AuthRoute.js";
import HangoutRoute from "./routes/HangoutRoute.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(UserRoute);
app.use(AuthRoute);
app.use(HangoutRoute);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server is running on port ${port}`));
