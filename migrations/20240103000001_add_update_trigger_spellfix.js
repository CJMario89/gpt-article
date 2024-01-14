/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  await knex.raw(
    `INSERT INTO CityInfo_spellfix(word) SELECT city FROM CityInfo_fts;`
  );
  await knex.raw(
    `INSERT INTO SpotInfo_spellfix(word) SELECT spot FROM SpotInfo_fts;`
  );
  await ON_UPDATE_SPELLFIX_TRIGGER(knex, "city");
  await ON_UPDATE_SPELLFIX_TRIGGER(knex, "spot");
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
  await DROP_ON_UPDATE_SPELLFIX_TRIGGER(knex, "city");
  await DROP_ON_UPDATE_SPELLFIX_TRIGGER(knex, "spot");
};

async function ON_UPDATE_SPELLFIX_TRIGGER(knex, name) {
  await knex.raw(`CREATE TRIGGER on_insert_${capitalize(name)}Info_spellfix
  AFTER INSERT ON ${capitalize(name)}Info
  FOR EACH ROW
  BEGIN
    INSERT OR REPLACE INTO ${capitalize(
      name
    )}Info_spellfix (word) VALUES (NEW.${name});
  END;`);
  await knex.raw(`CREATE TRIGGER on_update_${name}Info_spellfix
  AFTER UPDATE ON ${capitalize(name)}Info
  FOR EACH ROW
  BEGIN
    UPDATE ${capitalize(
      name
    )}Info_spellfix SET word = NEW.${name} WHERE word = OLD.${name};
  END;`);
  await knex.raw(`CREATE TRIGGER on_delete_${capitalize(name)}Info_spellfix
  AFTER DELETE ON ${capitalize(name)}Info
  FOR EACH ROW
  BEGIN
    DELETE FROM ${capitalize(name)}Info_spellfix WHERE word = OLD.${name};
  END;
  `);
}

async function DROP_ON_UPDATE_SPELLFIX_TRIGGER(knex, name) {
  await knex.raw(
    `DROP TRIGGER IF EXISTS on_insert_${capitalize(name)}Info_spellfix;`
  );
  await knex.raw(
    `DROP TRIGGER IF EXISTS on_update_${capitalize(name)}Info_spellfix;`
  );
  await knex.raw(
    `DROP TRIGGER IF EXISTS on_delete_${capitalize(name)}Info_spellfix;`
  );
}

function capitalize(str) {
  return str[0].toUpperCase() + str.slice(1);
}
