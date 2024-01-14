/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  return knex.schema.alterTable("SpotInfo", (table) => {
    table.string("articleType", 255).defaultTo("spot");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
  return knex.schema.alterTable("SpotInfo", (table) => {
    table.dropColumn("articleType");
  });
};
