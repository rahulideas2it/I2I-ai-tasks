exports.up = function(knex) {
  return knex.schema.createTable('notes', function(table) {
    table.uuid('id').primary();
    table.string('title').notNullable();
    table.text('content').notNullable();
    table.uuid('user_id').references('id').inTable('users').onDelete('CASCADE');
    table.timestamps(true, true);
    table.index('user_id');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('notes');
};