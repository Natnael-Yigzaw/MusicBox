require("dotenv").config();
const express = require("express");
const cors = require("cors");
const logger = require("morgan");
const connectDb = require("./database/connect");
const { notFound, errorHandler } = require("./middlewares/error");
const songRoutes = require("./routes/songs");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(logger("dev"));

connectDb();

app.use("/api", songRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
