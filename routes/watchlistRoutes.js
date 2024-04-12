const express = require("express");
const router = express.Router();

const environment = process.env.NODE_ENV || "development";
const configuration = require("../knexfile")[environment];
const knex = require("knex")(configuration);

router.get("/:userId", async (req, res) => {
  const userId = req.params.userId;

  try {
    const watchlist = await knex("watchlist")
      .where({ user_id: userId, in_watchlist: 1 })
      .join("mediaitem", "watchlist.mediaitem_id", "mediaitem.id")
      .select(
        "watchlist.id",
        "mediaitem.id",
        "mediaitem.title",
        "mediaitem.overview",
        "mediaitem.poster_url",
        "mediaitem.release_date",
        "mediaitem.api_id"
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
    const { title, release_date, overview, poster_url, api_id } = media;

    let existingMedia = await knex("mediaitem").where({ title }).first();

    let mediaId;

    if (!existingMedia) {
      const [newMediaId] = await knex("mediaitem").insert({
        title,
        release_date,
        overview,
        poster_url,
        api_id,
      });

      mediaId = newMediaId;
    } else {
      mediaId = existingMedia.id;
    }

    const isInWatchlist = await knex("watchlist")
      .where({
        user_id: userId,
        mediaitem_id: mediaId,
      })
      .andWhere(function () {
        this.where("in_watchlist", true).orWhere("watched", true);
      })
      .first();

    if (!isInWatchlist) {
      await knex("watchlist").insert({
        user_id: userId,
        mediaitem_id: mediaId,
        in_watchlist: true,
        watched: false,
        review: null,
      });

      res
        .status(201)
        .json({ message: "Media added to watchlist successfully" });
    } else {
      const { in_watchlist, watched } = isInWatchlist;

      if (in_watchlist && !watched) {
        res.status(400).json({
          error: "is already in your watchlist",
        });
      } else if (!in_watchlist && watched) {
        res.status(400).json({
          error: "is already in your watched section",
        });
      } else {
        res.status(400).json({ error: "is already in your watchlist" });
      }
    }
  } catch (error) {
    console.error("Error adding media to watchlist:", error);
    res
      .status(500)
      .json({ error: "Internal server error", details: error.message });
  }
});

router.delete("/:mediaitemId", async (req, res, next) => {
  const mediaitemId = req.params.mediaitemId;

  try {
    await knex("watchlist").where({ mediaitem_id: mediaitemId }).delete();
  } catch (error) {
    console.error("Error removing media from watchlist:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.put("/:mediaitemId", async (req, res) => {
  const mediaitemId = req.params.mediaitemId;

  try {
    await knex("watchlist")
      .where({ mediaitem_id: mediaitemId })
      .update({ in_watchlist: true, watched: false });

    res.json({ message: "Media moved back to watchlist successfully" });
  } catch (error) {
    console.error("Error moving media back to watchlist:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
