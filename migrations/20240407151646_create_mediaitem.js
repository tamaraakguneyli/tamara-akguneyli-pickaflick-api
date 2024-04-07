/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("mediaitem", (table) => {
    table.increments("id").primary();
    table.string("title").notNullable();
    table.string("genre").notNullable();
    table.date("release_date").notNullable();
    table.text("overview").notNullable();
    table.string("poster_url").notNullable();
    table.string("type").notNullable();
  });
};
exports.down = function (knex) {
  return knex.schema.dropTable("mediaitem");
};
