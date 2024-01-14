/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  await knex.schema.createTable("CityInfo", (table) => {
    table.increments("id").primary();
    table.string("prefecture", 255);
    table.string("city", 255).index();
    table.unique(["prefecture", "city"]);
    table.string("cityJapanese", 255);
    table.string("title", 255);
    table.string("description", 255);
    table.string("content", 255);
    table.string("region", 255);
    table.string("population", 255);
    table.string("area", 255);
    table.string("density", 255);
    table.string("founded", 255);
    table.string("website", 255);
    table.string("location", 255);
    table.string("viewport", 255);
    table.string("googleWebsite", 255);
    table.string("googleMapUrl", 255);
    table.timestamps(true, true);
  });

  await knex.schema.createTable("SpotInfo", (table) => {
    table.increments("id").primary();
    table.string("prefecture", 255);
    table.string("city", 255);
    // table
    //   .foreign(["prefecture", "city"])
    //   .references(["prefecture", "city"])
    //   .inTable("CityInfo");
    table.string("spot", 255).index().unique();
    table.string("title", 255);
    table.string("description", 255);
    table.string("content", 255);
    table.string("location", 255);
    table.string("viewport", 255);
    table.string("primaryType", 255);
    table.string("editorialSummary", 255);
    table.string("internationalPhoneNumber", 255);
    table.string("adrFormatAddress", 255);
    table.string("weekdayDescriptions", 255);
    table.string("reviews", 255);
    table.boolean("goodForChildren", 255);
    table.boolean("goodForGroups", 255);
    table.boolean("allowsDogs", 255);
    table.boolean("restroom", 255);
    table.boolean("wheelchairAccessibleEntrance", 255);
    table.string("googleRating", 255);
    table.string("googleRatingCount", 255);
    table.string("googleWebsite", 255);
    table.string("googleMapUrl", 255);
    table.boolean("reservable", 255);
    table.boolean("servesBreakfast", 255);
    table.boolean("servesBrunch", 255);
    table.boolean("servesLunch", 255);
    table.boolean("servesDinner", 255);
    table.boolean("servesBeer", 255);
    table.string("priceLevel", 255);
    table.string("payment", 255);
    table.boolean("takeout", 255);
    table.boolean("delivery", 255);
    table.boolean("dineIn", 255);
    table.boolean("servesVegetarianFood", 255);
    table.boolean("parkingLot", 255);
    table.timestamps(true, true);
  });

  await knex.schema.createTable("SpotCategory", (table) => {
    table.increments("id").primary();
    table.string("prefecture", 255);
    table.string("city", 255);
    table.string("spot", 255).index();
    table.foreign(["spot"]).references(["spot"]).inTable("SpotInfo");
    table.string("category", 255);
    table.unique(["spot", "category"]);
    table.timestamps(true, true);
  });

  await knex.schema.createTable("CityImage", (table) => {
    table.increments("id").primary();
    table.string("prefecture", 255);
    table.string("city", 255);
    table.string("image", 255);
    table.string("referenceLink", 255);
    table.string("referenceName", 255);
    table.string("fetched", 255);
    table
      .foreign(["prefecture", "city"])
      .references(["prefecture", "city"])
      .inTable("CityInfo");
    table.timestamps(true, true);
  });

  await knex.schema.createTable("SpotImage", (table) => {
    table.increments("id").primary();
    table.string("prefecture", 255);
    table.string("city", 255);
    table.string("spot", 255);
    table.foreign(["spot"]).references(["spot"]).inTable("SpotInfo");
    table.string("image", 255);
    table.string("referenceLink", 255);
    table.string("referenceName", 255);
    table.string("fetched", 255);
    table.timestamps(true, true);
  });

  await knex.raw(ON_UPDATE_TIMESTAMP_TRIGGER("CityInfo"));
  await knex.raw(ON_UPDATE_TIMESTAMP_TRIGGER("SpotInfo"));
  await knex.raw(ON_UPDATE_TIMESTAMP_TRIGGER("SpotCategory"));
  await knex.raw(ON_UPDATE_TIMESTAMP_TRIGGER("CityImage"));
  await knex.raw(ON_UPDATE_TIMESTAMP_TRIGGER("SpotImage"));
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
  await knex.schema.dropTableIfExists("SpotImage");
  await knex.schema.dropTableIfExists("CityImage");
  await knex.schema.dropTableIfExists("SpotCategory");
  await knex.schema.dropTableIfExists("SpotInfo");
  await knex.schema.dropTableIfExists("CityInfo");
  await knex.raw(DROP_ON_UPDATE_TIMESTAMP_TRIGGER("CityInfo"));
  await knex.raw(DROP_ON_UPDATE_TIMESTAMP_TRIGGER("SpotInfo"));
  await knex.raw(DROP_ON_UPDATE_TIMESTAMP_TRIGGER("SpotCategory"));
  await knex.raw(DROP_ON_UPDATE_TIMESTAMP_TRIGGER("CityImage"));
  await knex.raw(DROP_ON_UPDATE_TIMESTAMP_TRIGGER("SpotImage"));
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
