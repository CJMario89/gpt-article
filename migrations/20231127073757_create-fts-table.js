/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  await knex.raw(
    `CREATE VIRTUAL TABLE CityInfo_fts USING fts4(city, tokenize=unicode61 "remove_diacritics=0" "tokenchars=.-'");`
  );
  await knex.raw(
    `CREATE VIRTUAL TABLE SpotInfo_fts USING fts4(spot, tokenize=unicode61 "remove_diacritics=0" "tokenchars=.-'");`
  );
  await knex.raw(`CREATE VIRTUAL TABLE CityInfo_spellfix USING spellfix1;`);
  await knex.raw(`CREATE VIRTUAL TABLE SpotInfo_spellfix USING spellfix1;`);

  await knex.raw(`INSERT INTO CityInfo_fts(city) SELECT city FROM CityInfo;`);
  await knex.raw(`INSERT INTO SpotInfo_fts(spot) SELECT spot FROM SpotInfo;`);
  await knex.raw(
    `INSERT INTO CityInfo_spellfix(word) SELECT city FROM CityInfo_fts;`
  );
  await knex.raw(
    `INSERT INTO SpotInfo_spellfix(word) SELECT spot FROM SpotInfo_fts;`
  );
  await ON_UPDATE_FTS_TRIGGER(knex, "city");
  await ON_UPDATE_FTS_TRIGGER(knex, "spot");
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
  await knex.raw(`DROP TABLE IF EXISTS CityInfo_fts;`);
  await knex.raw(`DROP TABLE IF EXISTS SpotInfo_fts;`);
  await knex.raw(`DROP TABLE IF EXISTS CityInfo_spellfix;`);
  await knex.raw(`DROP TABLE IF EXISTS SpotInfo_spellfix;`);
  await DROP_ON_UPDATE_FTS_TRIGGER(knex, "city");
  await DROP_ON_UPDATE_FTS_TRIGGER(knex, "spot");
};

async function ON_UPDATE_FTS_TRIGGER(knex, name) {
  await knex.raw(`CREATE TRIGGER on_insert_${capitalize(name)}Info
  AFTER INSERT ON ${capitalize(name)}Info
  FOR EACH ROW
  BEGIN
    INSERT OR REPLACE INTO ${capitalize(
      name
    )}Info_fts (${name}) VALUES (NEW.${name});
  END;`);
  await knex.raw(`CREATE TRIGGER on_update_${name}Info
  AFTER UPDATE ON ${capitalize(name)}Info
  FOR EACH ROW
  BEGIN
    UPDATE ${capitalize(
      name
    )}Info_fts SET ${name} = NEW.${name} WHERE ${name} = OLD.${name};
  END;`);
  await knex.raw(`CREATE TRIGGER on_delete_${capitalize(name)}Info
  AFTER DELETE ON ${capitalize(name)}Info
  FOR EACH ROW
  BEGIN
    DELETE FROM ${capitalize(name)}Info_fts WHERE ${name} = OLD.${name};
  END;
  `);
}

async function DROP_ON_UPDATE_FTS_TRIGGER(knex, name) {
  await knex.raw(`DROP TRIGGER IF EXISTS on_insert_${capitalize(name)}Info;`);
  await knex.raw(`DROP TRIGGER IF EXISTS on_update_${capitalize(name)}Info;`);
  await knex.raw(`DROP TRIGGER IF EXISTS on_delete_${capitalize(name)}Info;`);
}

function capitalize(str) {
  return str[0].toUpperCase() + str.slice(1);
}
