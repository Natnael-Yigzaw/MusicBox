require("dotenv").config();
const express = require("express");
const cors = require("cors");
const logger = require("morgan");

const app = express();

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.dotenv.PORT || 4000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
