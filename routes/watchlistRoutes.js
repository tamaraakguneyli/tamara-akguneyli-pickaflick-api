const express = require("express");
const router = express.Router();

const environment = process.env.NODE_ENV || "development";
const configuration = require("../knexfile")[environment];
const knex = require("knex")(configuration);

router.get("/:userId", async (req, res) => {
  const userId = req.params.userId;

  try {
    const watchlist = await knex("watchlist")
      .where({ user_id: userId })
      .join("mediaitem", "watchlist.mediaitem_id", "mediaitem.id")
      .select(
        "watchlist.id",
        "mediaitem.id",
        "mediaitem.title",
        "mediaitem.overview",
        "mediaitem.poster_url",
        "mediaitem.release_date"
      );

    res.json(watchlist);
  } catch (error) {
    console.error("Error fetching watchlist:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/", async (req, res) => {
  const { userId, media } = req.body;

  try {
    const { title, release_date, overview, poster_url } = media;

    const existingMedia = await knex("mediaitem").where({ title }).first();

    let mediaId;

    if (existingMedia) {
      mediaId = existingMedia.id;
    } else {
      const [newMediaId] = await knex("mediaitem").insert({
        title,
        release_date,
        overview,
        poster_url,
      });
      mediaId = newMediaId;
    }

    await knex("watchlist").insert({
      user_id: userId,
      mediaitem_id: mediaId,
      in_watchlist: true,
      watched: false,
      review: null,
    });

    res.status(201).json({ message: "Media added to watchlist successfully" });
  } catch (error) {
    console.error("Error adding media to watchlist:", error);
    res
      .status(500)
      .json({ error: "Internal server error", details: error.message });
  }
});
module.exports = router;
