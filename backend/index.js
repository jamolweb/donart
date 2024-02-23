const express = require("express");
const app = express();
require("dotenv").config();
const corsMiddleware = require("./config/corsConfig");

// ! ACCESS TO THE FRONTEND and EXPRESS JS THINGS
app.use(corsMiddleware);
app.use(express.json());
app.use(express.static("static"));

// ! ROUTES
const productRouter = require("./routes/productRouter");
const adminRouter = require("./routes/isAdminRouter");
const authRouter = require("./routes/authRouter");
const orderRouter = require("./routes/orderRouter");
const categoryRouter = require("./routes/categoryRouter");
const userRouter = require("./routes/userRouter");
const connectToDatabase = require("./config/db-connettion");

app.use("/auth", authRouter);
app.use("/products", productRouter);
app.use("/admin", adminRouter);
app.use("/category", categoryRouter);
app.use("/orders", orderRouter);
app.use("/users", userRouter);
app.get('/', (req, res) => res.end('Response from server'))

// ! CONNETTING TO THE DATABASE
connectToDatabase();

// ! LISTENING SERVER
const PORT = process.env.PORT || 3030;
app.listen(PORT, (error) => error ? console.error(`\x1b[31mError:\x1b[0m ${error}`) : console.log( `\x1b[32mSERVER IS RUNNING ON THE \x1b[36m'http://localhost:${PORT}'\x1b[0m PORT`));

// access token for admin
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbklkIjoiNjVjZDlkZDExODc0NzYzNjcwMWYzYzc2Iiwicm9sZSI6ImFkbWluIiwibnVtYmVyIjoiOTQ0NTA0NDY1IiwibmFtZSI6IkphbW9sYWRkaW4gSXNuYXRkaW5vdiIsImlhdCI6MTcwODA4MjIxOCwiZXhwIjoxNzA4OTQ2MjE4fQ.lSm02JEFpZ_4taoO1fQ6V51-xY-sIuVuKFjF3qgbats