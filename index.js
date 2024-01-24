import express from "express";
import authRoute from "./routes/auth.js";
import userRoute from "./routes/student.js";
import searchRoute from "./routes/search.js";
import connectToDatabase from "./db.js";
import cors from "cors";
import "dotenv/config";

const PORT = process.env.PORT || 8080;

const app = express();

app.use(express.urlencoded({ extended: true })); // getting URL encodings
app.use(express.json());
app.use(cors());
// connecting database
connectToDatabase();
//API Routes
app.use("/api/auth", authRoute);
app.use("/api/student", userRoute);
app.use("/api/search", searchRoute);
// 404 handler
app.use("*", (req, res, next) => {
  res.send("Welcome to bytelink academy");
});

app.listen(PORT, () => {
  console.log("backend service listening on port :", PORT);
});
