const express = require("express");
const cors = require("cors");
const app = express();
const userRoutes = require("./routes/userRoutes");
const watchlistRoutes = require("./routes/watchlistRoutes");
require("dotenv").config();

const PORT = process.env.PORT || 8081;

app.use(cors());

app.use(express.json());

app.use("/pickaflix", userRoutes);

app.use("/watchlist", watchlistRoutes);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
