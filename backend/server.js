const express = require("express");
const colors = require("colors");
const {connectDB} = require("./config/db");
const dotenv = require("dotenv").config();
const goalRoutes = require("./routes/goalRoutes");
const {errorHandler} = require("./middleware/errorMiddleware");
const port = process.env.PORT || 5000;

connectDB();
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use("/api/goals", goalRoutes);

app.use(errorHandler);

app.listen(port, () => {console.log(`mern practice on ${port}.`.black.bgCyan)})