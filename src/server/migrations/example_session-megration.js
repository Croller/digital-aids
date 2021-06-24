/* eslint-disable camelcase */

// code example node-pg-migrate
// https://github.com/salsita/node-pg-migrate/tree/master/test/migrations

exports.comment = 'create/drop table t1';

exports.up = (pgm) => {
  pgm.createTable('t1', {
    id: 'id',
    string: { type: 'text', notNull: true },
    created: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
  });
};

exports.down = (pgm) => {
  pgm.dropTable('t1', {
    ifExists: true,
  });
};
