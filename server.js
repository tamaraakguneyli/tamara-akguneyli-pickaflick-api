const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();

const PORT = process.env.PORT || 8081;

app.use(cors());

app.use(express.json());

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
