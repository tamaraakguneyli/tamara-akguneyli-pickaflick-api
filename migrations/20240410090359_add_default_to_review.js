exports.up = function (knex) {
  return knex.schema.alterTable("watchlist", (table) => {
    table.text("review").defaultTo("There is currently no reviews").alter();
  });
};

exports.down = function (knex) {
  return knex.schema.alterTable("watchlist", (table) => {
    table.text("review").alter();
  });
};
