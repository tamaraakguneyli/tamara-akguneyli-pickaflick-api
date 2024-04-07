const router = express.Router();

// get user's watchlist
router.get("/", async (req, res) => {
  const userId = req.query.userId;

  try {
    const watchlist = await knex("watchlist")
      .where({ user_id: userId })
      .join("mediaitem", "watchlist.mediaitem_id", "mediaitem.id")
      .select("watchlist.id", "mediaitem.title", "mediaitem.description");

    res.json(watchlist);
  } catch (error) {
    console.error("Error fetching watchlist:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
