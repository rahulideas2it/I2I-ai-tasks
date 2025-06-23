exports.up = function(knex) {
  return knex.schema.createTable('users', function(table) {
    table.uuid('id').primary();
    table.string('email').unique().notNullable();
    table.string('password').notNullable();
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('users');
};