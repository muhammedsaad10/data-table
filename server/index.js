import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import itemRoute from "./routes/items.js";
import cors from "cors";

const app = express();
// mongoose.set("strictQuery", false);
dotenv.config();
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("connected to mongodb.");
  } catch (error) {
    throw error;
  }
};
//middleware
app.use(cors());
app.use(express.json());
app.use("/item", itemRoute);

// app.use((err, req, res, next) => {
//   const errorStatus = err.status || 500;
//   const errormessage = err.message || "somethin went wrong";
//   return res.status(errorStatus).json({
//     success: false,
//     status: errorStatus,
//     message: errormessage,
//     stack: err.stack,
//   });
// });

app.listen(8800, () => {
  connect();
  console.log("connected to backend.");
});
