exports.up = function (knex) {
  return knex.schema.table("mediaitem", function (table) {
    table.dropColumn("genre");
  });
};

exports.down = function (knex) {
  return knex.schema.table("mediaitem", function (table) {
    table.string("genre").notNullable();
  });
};
