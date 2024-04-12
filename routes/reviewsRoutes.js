const express = require("express");
const router = express.Router();

const environment = process.env.NODE_ENV || "development";
const configuration = require("../knexfile")[environment];
const knex = require("knex")(configuration);

router.put("/", async (req, res) => {
  const { mediaitem_id, user_id, review } = req.body;

  try {
    await knex("watchlist")
      .where({
        mediaitem_id: mediaitem_id,
        user_id: user_id,
      })
      .update({ review: review });

    res.status(200).json({ message: "Review updated successfully" });
  } catch (error) {
    console.error("Error updating review:", error);
    res.status(500).json({ error: "Failed to update review" });
  }
});

router.get("/:mediaId", async (req, res) => {
  if (req.query.external_api_id) {
    const reviews = await knex("watchlist")
      .join("mediaitem", "mediaitem.id", "watchlist.mediaitem_id")
      .join("user", "user.id", "watchlist.user_id")
      .select(
        "watchlist.id",
        "mediaitem.id",
        "watchlist.review",
        "mediaitem.api_id",
        "user.username"
      )
      .where({ api_id: req.query.external_api_id })
      .havingNotNull("review");

    return res.json(reviews);
  }
  let { mediaId } = req.params;
  try {
    const reviews = await knex("watchlist")
      .select("id", "review", "user_id")
      .where({ mediaitem_id: mediaId })
      .havingNotNull("review");

    res.json(reviews);
  } catch (error) {
    console.error("Error fetching reviews:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.put("/", async (req, res) => {
  const { mediaitem_id, user_id, review } = req.body;

  try {
    await knex("watchlist")
      .where({ mediaitem_id: mediaitem_id, user_id: user_id })
      .update({ review: review });

    res.status(200).json({ message: "Review deleted successfully" });
  } catch (error) {
    console.error("Error deleting review:", error);
    res.status(500).json({ error: "Failed to delete review" });
  }
});

router.get("/:mediaId/users", async (req, res) => {
  try {
    const result = await knex
      .from("watchlist")
      .innerJoin("user", "watchlist.user_id", "user.id")
      .where("mediaitem_id", req.params.mediaId)
      .havingNotNull("review");

    return res.json(result);
  } catch (error) {
    console.error("Error fetching reviews:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
