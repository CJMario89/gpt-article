/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  await knex.raw(
    `CREATE VIRTUAL TABLE CityArticle_fts USING fts4(city, tokenize=unicode61 "remove_diacritics=0" "tokenchars=.-'");`
  );

  await knex.raw(
    `CREATE VIRTUAL TABLE SpotArticle_fts USING fts4(spot, tokenize=unicode61 "remove_diacritics=0" "tokenchars=.-'");`
  );

  await knex.raw(`CREATE VIRTUAL TABLE CityArticle_spellfix USING spellfix1;`);
  await knex.raw(`CREATE VIRTUAL TABLE SpotArticle_spellfix USING spellfix1;`);

  await knex.raw(
    `INSERT INTO CityArticle_fts(city) SELECT city FROM CityArticle;`
  );
  await knex.raw(
    `INSERT INTO SpotArticle_fts(spot) SELECT spot FROM SpotArticle;`
  );
  await knex.raw(
    `INSERT INTO CityArticle_spellfix(word) SELECT city FROM CityArticle_fts;`
  );
  await knex.raw(
    `INSERT INTO SpotArticle_spellfix(word) SELECT spot FROM SpotArticle_fts;`
  );
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
  await knex.raw(`DROP TABLE IF EXISTS CityArticle_fts;`);
  await knex.raw(`DROP TABLE IF EXISTS SpotArticle_fts;`);
  await knex.raw(`DROP TABLE IF EXISTS CityArticle_spellfix;`);
  await knex.raw(`DROP TABLE IF EXISTS spotArticle_spellfix;`);
};
