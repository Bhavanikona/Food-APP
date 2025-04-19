
import express from "express";
import cors from "cors";
import "dotenv/config";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodroute.js";
import userRouter from "./routes/userroute.js";
import cartRouter from "./routes/cartroute.js";
import orderRouter from "./routes/orderroute.js";

const app = express();
const port = process.env.PORT || 5000;

// Middlewares
app.use(express.json());
app.use(cors({
  origin: ["http://localhost:5173", "https://food-app-frontend-dxgb.onrender.com"],
  credentials: true,
}));
app.options("*", cors()); 

// Connect to the database
connectDB();

// Routes
app.use("/api/food", foodRouter);
app.use("/images", express.static("uploads"));
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

app.get("/", (req, res) => {
  res.send("API working");
});

// Start the server
app.listen(port, () => {
  console.log(`Server started http://127.0.0.1:${port}`);
});

