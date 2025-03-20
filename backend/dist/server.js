import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import routes from './routes/index.js';
dotenv.config();
const app = express();
const PORT = process.env.PORT || 4000;
connectDB();
connectCloudinary();
// middlewares
app.use(cors());
app.use(express.json());
app.use('/api', routes);
app.listen(PORT, () => {
    console.log("Server Connected", PORT);
});
