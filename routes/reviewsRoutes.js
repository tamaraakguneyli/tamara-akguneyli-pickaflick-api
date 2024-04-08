const express = require("express");
const router = express.Router();

const environment = process.env.NODE_ENV || "development";
const configuration = require("../knexfile")[environment];
const knex = require("knex")(configuration);

router.post("/", async (req, res) => {
  const { mediaitem_id, user_id, review } = req.body;

  try {
    const existingEntry = await knex("watchlist")
      .where({ mediaitem_id, user_id })
      .first();

    if (existingEntry) {
      await knex("watchlist")
        .where({ mediaitem_id, user_id })
        .update({ review });

      res.status(200).json({ message: "Review updated successfully" });
    } else {
      await knex("watchlist").insert({
        mediaitem_id,
        user_id,
        review,
      });

      res.status(201).json({ message: "Review added successfully" });
    }
  } catch (error) {
    console.error("Error adding or updating review:", error);
    res.status(500).json({ error: "Failed to add or update review" });
  }
});
router.get("/:mediaId", async (req, res) => {
  const { mediaId } = req.params;

  try {
    const reviews = await knex("watchlist")
      .select("id", "review", "user_id")
      .where({ mediaitem_id: mediaId });

    res.json(reviews);
  } catch (error) {
    console.error("Error fetching reviews:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
