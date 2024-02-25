/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  await knex.schema.createTable("PrefectureInfo", (table) => {
    table.increments("id").primary();
    table.string("region", 255);
    table.string("prefecture", 255);
    table.unique(["region", "prefecture"]);
    table.string("title", 255);
    table.string("description", 255);
    table.string("content", 255);
    table.timestamps(true, true);
  });

  await knex.schema.createTable("PrefectureImage", (table) => {
    table.increments("id").primary();
    table.string("region", 255);
    table.string("prefecture", 255);
    table.string("image", 255);
    table.string("referenceLink", 255);
    table.string("referenceName", 255);
    table.string("fetched", 255);
    table
      .foreign(["region", "prefecture"])
      .references(["region", "prefecture"])
      .inTable("PrefectureInfo");
    table.timestamps(true, true);
  });

  await knex.raw(ON_UPDATE_TIMESTAMP_TRIGGER("PrefectureInfo"));
  await knex.raw(ON_UPDATE_TIMESTAMP_TRIGGER("PrefectureImage"));
};

//image
//explore

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
  await knex.schema.dropTableIfExists("PrefectureInfo");
  await knex.schema.dropTableIfExists("PrefectureImage");
  await knex.raw(DROP_ON_UPDATE_TIMESTAMP_TRIGGER("PrefectureInfo"));
  await knex.raw(DROP_ON_UPDATE_TIMESTAMP_TRIGGER("PrefectureImage"));
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
