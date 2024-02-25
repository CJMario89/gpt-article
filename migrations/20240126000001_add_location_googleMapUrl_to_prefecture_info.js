/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  return knex.schema.alterTable("PrefectureInfo", (table) => {
    table.string("location", 255);
    table.string("googleMapUrl", 255);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
  return knex.schema.alterTable("PrefectureInfo", (table) => {
    table.dropColumn("location");
    table.dropColumn("googleMapUrl");
  });
};
