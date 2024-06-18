import cors from "cors";
import express from "express";
import dotenv from "dotenv";
import path from "path";
import multer from "multer";

import UserRoute from "./routes/UserRoute.js";
import AuthRoute from "./routes/AuthRoute.js";
import HangoutRoute from "./routes/HangoutRoute.js";
import KulinerRoute from "./routes/KulinerRoute.js";
import WisataRoute from "./routes/WisataRoute.js";

dotenv.config();

const app = express();

app.use(
  cors({
    credentials: true,
    origin: process.env.APP_PORT || "http://localhost:3000",
  })
);

app.use(express.json());
app.use(UserRoute);
app.use(AuthRoute);
app.use(HangoutRoute);
app.use(KulinerRoute);
app.use(WisataRoute);

const upload = multer({ dest: "uploads/" });
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

app.get("/", (req, res) => {
  res.send("Backend is running.");
});


const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server is running on port ${port}`));
