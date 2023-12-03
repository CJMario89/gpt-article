// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  development: {
    client: "better-sqlite3",
    connection: {
      filename: "./sqlite3/dev.sqlite3",
    },
    useNullAsDefault: true,
    pool: {
      afterCreate: (conn, done) => {
        try {
          conn.loadExtension("./sqlite3/spellfix.so");
          done();
        } catch (e) {
          done(e, conn);
        }
      },
    },
  },
};
