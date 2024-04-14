exports.seed = function (knex) {
  return knex("watchlist")
    .del()
    .then(function () {
      return knex("watchlist").insert([
        {
          user_id: 46,
          mediaitem_id: 95,
          in_watchlist: 0,
          watched: 1,
          review: "Such an inspiring film!",
        },
        {
          user_id: 46,
          mediaitem_id: 96,
          in_watchlist: 1,
          watched: 0,
          review: "Such an inspiring film!",
        },
        {
          user_id: 46,
          mediaitem_id: 97,
          in_watchlist: 1,
          watched: 0,
          review: "Such an inspiring film!",
        },
        {
          user_id: 46,
          mediaitem_id: 98,
          in_watchlist: 1,
          watched: 0,
          review: "Such an inspiring film!",
        },
        {
          user_id: 47,
          mediaitem_id: 95,
          in_watchlist: 0,
          watched: 1,
          review: "Beautiful animation and story",
        },
        {
          user_id: 47,
          mediaitem_id: 96,
          in_watchlist: 1,
          watched: 0,
          review: "Beautiful animation and story.",
        },
        {
          user_id: 47,
          mediaitem_id: 97,
          in_watchlist: 1,
          watched: 0,
          review: "Beautiful animation and story.",
        },
        {
          user_id: 47,
          mediaitem_id: 98,
          in_watchlist: 1,
          watched: 0,
          review: "Beautiful animation and story.",
        },
        {
          user_id: 48,
          mediaitem_id: 95,
          in_watchlist: 0,
          watched: 1,
          review: "Unique concept, loved the characters.",
        },
        {
          user_id: 48,
          mediaitem_id: 96,
          in_watchlist: 1,
          watched: 0,
          review: "Unique concept, loved the characters.",
        },
        {
          user_id: 48,
          mediaitem_id: 97,
          in_watchlist: 1,
          watched: 0,
          review: "Unique concept, loved the characters.",
        },
        {
          user_id: 48,
          mediaitem_id: 98,
          in_watchlist: 1,
          watched: 0,
          review: "Fun and entertaining storyline.",
        },
        {
          user_id: 49,
          mediaitem_id: 95,
          in_watchlist: 0,
          watched: 1,
          review: "Fun and entertaining storyline.",
        },
        {
          user_id: 49,
          mediaitem_id: 96,
          in_watchlist: 1,
          watched: 0,
          review: "Fun and entertaining storyline.",
        },
        {
          user_id: 49,
          mediaitem_id: 97,
          in_watchlist: 1,
          watched: 0,
          review: "Fun and entertaining storyline.",
        },
        {
          user_id: 49,
          mediaitem_id: 98,
          in_watchlist: 1,
          watched: 0,
          review: "Fun and entertaining storyline.",
        },
      ]);
    });
};
