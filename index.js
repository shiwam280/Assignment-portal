import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import bodyParser from "body-parser";
import userRoutes from "./routes/userRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import cors from "cors";
const app = express();

dotenv.config();
app.use(cors({ origin: "http:localhost:5173", credentials: true }));
app.use(bodyParser.json());

app.use("/api/users", userRoutes);
app.use("/api/admins", adminRoutes);

app.listen(process.env.PORT, () => {
  connectDB();
  console.log("Server started");
});
