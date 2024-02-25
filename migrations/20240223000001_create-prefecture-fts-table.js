/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  await knex.raw(
    `CREATE VIRTUAL TABLE PrefectureInfo_fts USING fts4(prefecture, tokenize=unicode61 "remove_diacritics=0" "tokenchars=.-'");`
  );
  await knex.raw(
    `CREATE VIRTUAL TABLE PrefectureInfo_spellfix USING spellfix1;`
  );
  await knex.raw(
    `INSERT INTO PrefectureInfo_fts(prefecture) SELECT prefecture FROM PrefectureInfo;`
  );
  await knex.raw(
    `INSERT INTO PrefectureInfo_spellfix(word) SELECT prefecture FROM PrefectureInfo_fts;`
  );

  await ON_UPDATE_FTS_TRIGGER(knex, "prefecture");
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
  await knex.raw(`DROP TABLE IF EXISTS PrefectureInfo_fts;`);
  await knex.raw(`DROP TABLE IF EXISTS PrefectureInfo_spellfix;`);
  await DROP_ON_UPDATE_FTS_TRIGGER(knex, "Prefecture");
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
