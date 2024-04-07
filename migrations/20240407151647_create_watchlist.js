/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("watchlist", (table) => {
    table.increments("id").primary();
    table.integer("user_id").unsigned().notNullable();
    table.integer("mediaitem_id").unsigned().notNullable();
    table.boolean("in_watchlist").defaultTo(true);
    table.boolean("watched").defaultTo(false);
    table.text("review");

    table.foreign("user_id").references("user.id").onDelete("CASCADE");
    table
      .foreign("mediaitem_id")
      .references("mediaitem.id")
      .onDelete("CASCADE");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("watchlist");
};
