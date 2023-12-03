/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  await knex.schema.createTable("CityArticle", (table) => {
    table.increments("id").primary();
    table.string("country", 255);
    table.string("city", 255).unique().index();
    table.string("city_japanese", 255);
    table.string("title", 255);
    table.string("description", 255);
    table.string("content", 255);
    table.string("region", 255);
    table.string("prefecture", 255);
    table.string("population", 255);
    table.string("area", 255);
    table.string("density", 255);
    table.string("founded", 255);
    table.string("website", 255);
    table.string("location", 255);
    table.binary("image");
    table.binary("preview_image");
    table.string("image_reference_link", 255);
    table.string("image_reference_name", 255);
    table.string("google_rating", 255);
    table.string("google_rating_count", 255);
    table.string("google_website", 255);
    table.string("google_map_url", 255);
    table.timestamps(true, true);
  });

  await knex.schema.createTable("SpotArticle", (table) => {
    table.increments("id").primary();
    table.string("country", 255);
    table.string("city", 255).references("city").inTable("CityArticle");
    table.string("spot", 255).unique().index();
    table.string("title", 255);
    table.string("description", 255);
    table.string("content", 255);
    table.string("location", 255);
    table.binary("image");
    table.binary("preview_image");
    table.string("image_reference_link", 255);
    table.string("image_reference_name", 255);
    table.string("google_website", 255);
    table.string("google_map_url", 255);
    table.timestamps(true, true);
  });

  await knex.schema.createTable("CityCategory", (table) => {
    table.increments("id").primary();
    table.string("city", 255).references("city").inTable("CityArticle");
    table.string("category", 255);
    table.timestamps(true, true);
  });

  await knex.schema.createTable("SpotCategory", (table) => {
    table.increments("id").primary();
    table.string("city", 255).references("city").inTable("CityArticle");
    table.string("spot", 255).references("spot").inTable("SpotArticle");
    table.string("category", 255);
    table.timestamps(true, true);
  });

  await knex.raw(ON_UPDATE_TIMESTAMP_TRIGGER("CityArticle"));
  await knex.raw(ON_UPDATE_TIMESTAMP_TRIGGER("SpotArticle"));
  await knex.raw(ON_UPDATE_TIMESTAMP_TRIGGER("CityCategory"));
  await knex.raw(ON_UPDATE_TIMESTAMP_TRIGGER("SpotCategory"));
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
  await knex.schema.dropTableIfExists("SpotCategory");
  await knex.schema.dropTableIfExists("CityCategory");
  await knex.schema.dropTableIfExists("SpotArticle");
  await knex.schema.dropTableIfExists("CityArticle");
  await knex.raw(DROP_ON_UPDATE_TIMESTAMP_TRIGGER("CityArticle"));
  await knex.raw(DROP_ON_UPDATE_TIMESTAMP_TRIGGER("SpotArticle"));
  await knex.raw(DROP_ON_UPDATE_TIMESTAMP_TRIGGER("CityCategory"));
  await knex.raw(DROP_ON_UPDATE_TIMESTAMP_TRIGGER("SpotCategory"));
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
