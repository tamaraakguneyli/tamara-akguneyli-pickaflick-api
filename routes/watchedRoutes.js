const express = require("express");
const router = express.Router();

const environment = process.env.NODE_ENV || "development";
const configuration = require("../knexfile")[environment];
const knex = require("knex")(configuration);

router.put("/:mediaitemId", async (req, res) => {
  const mediaitemId = req.params.mediaitemId;

  try {
    await knex("watchlist")
      .where({ mediaitem_id: mediaitemId })
      .update({ in_watchlist: 0, watched: 1 });
  } catch (error) {
    console.log("error adding to watched section");
  }
});

router.get("/:userId", async (req, res) => {
  const userId = req.params.userId;

  try {
    const watched = await knex("watchlist")
      .where({ user_id: userId, watched: 1 })
      .join("mediaitem", "watchlist.mediaitem_id", "mediaitem.id")
      .select(
        "watchlist.id",
        "mediaitem.id",
        "mediaitem.title",
        "mediaitem.overview",
        "mediaitem.poster_url",
        "mediaitem.release_date"
      );

    res.json(watched);
  } catch (error) {
    console.error("Error fetching watched section", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
