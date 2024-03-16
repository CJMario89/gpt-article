/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  await knex.schema.createTable("PlaceInfoJaJP", (table) => {
    table.increments("id").primary();
    table.string("placeId", 255).unique().index();
    table.string("region", 255);
    table.string("prefecture", 255);
    table.string("city", 255);
    table.string("spot", 255);
    table.string("title", 255);
    table.string("description", 255);
    table.string("content", 255);
    table.string("address", 255);
    table.string("openTime", 255);
    table.timestamps(true, true);
  });

  await knex.raw(ON_UPDATE_TIMESTAMP_TRIGGER("PlaceInfoJaJP"));
};

//image
//explore

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
  await knex.schema.dropTableIfExists("PlaceInfoJaJP");
  await knex.raw(DROP_ON_UPDATE_TIMESTAMP_TRIGGER("PlaceInfoJaJP"));
};

function ON_UPDATE_TIMESTAMP_TRIGGER(name) {
  return `
CREATE TRIGGER on_update_timestamp_${name}
AFTER UPDATE ON ${name}
FOR EACH ROW
BEGIN
    UPDATE ${name}
    SET updated_at = CURRENT_TIMESTAMP
    WHERE id = NEW.id;
END;
`;
}

function DROP_ON_UPDATE_TIMESTAMP_TRIGGER(name) {
  return `
DROP TRIGGER IF EXISTS on_update_timestamp_${name};
`;
}
