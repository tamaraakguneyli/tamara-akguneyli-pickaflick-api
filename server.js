const express = require("express");
const cors = require("cors");
const app = express();
const userRoutes = require("./routes/userRoutes");
const watchlistRoutes = require("./routes/watchlistRoutes");
const watchedRoutes = require("./routes/watchedRoutes");
const reviewsRoutes = require("./routes/reviewsRoutes");
require("dotenv").config();

const PORT = process.env.PORT || 8081;

app.use(cors());

app.use(express.json());

app.use("/user", userRoutes);

app.use("/watchlist", watchlistRoutes);

app.use("/watched", watchedRoutes);

app.use("/reviews", reviewsRoutes);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
