exports.up = function (knex) {
  return knex.schema.table("mediaitem", (table) => {
    table.dropColumn("type");
  });
};

exports.down = function (knex) {
  return knex.schema.table("mediaitem", (table) => {
    table.string("type").notNullable();
  });
};
