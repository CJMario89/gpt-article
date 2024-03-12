const knex = require("knex");
const instance = knex({
  client: "better-sqlite3",
  connection: {
    filename: "./sqlite3/dev.sqlite3",
  },
  useNullAsDefault: true,
  pool: {
    afterCreate: async (conn, done) => {
      try {
        conn.loadExtension("./sqlite3/spellfix.so");

        // const selectCity = await conn.prepare(
        //   "SELECT word as city FROM CityInfo_spellfix WHERE word MATCH 'a' LIMIT 10 OFFSET 1;"
        // );
        // const selectSpot = await conn.prepare(
        //   "SELECT word as spot FROM SpotInfo_spellfix WHERE word MATCH 'a' LIMIT 10 OFFSET 1;"
        // );
        // await selectCity.run();
        // await selectSpot.run();
        // //try to execute once, after first command being executed. Spellfix is going well. still don't know why
        done();
      } catch (e) {
        done(e, conn);
      }
    },
  },
});

export { instance };
