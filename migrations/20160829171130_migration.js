exports.up = function(knex, Promise) {
  return Promise.all([
  	knex.schema.createTable('users', function(table){
      table.increments('user_id');
      table.string('user_name').notNullable();
      table.string('game_id').notNullable();
      table.integer('num_wins').notNullable();
      table.integer('num_losses').notNullable();
  	}),
    knex.schema.createTable('games', function(table){
      table.integer('game_id').notNullable();
      table.string('user1_id').notNullable();
      table.string('user2_id').notNullable();
      table.string('user1_orientation').notNullable();
      table.string('user2_orientation').notNullable();
      table.string('position').notNullable(); //pgnString
      table.boolean('inProgress').notNullable();
    }),
    knex.schema.createTable('messages', function(table){
      table.increments('message_id').primary();
      table.string('content').notNullable();
      table.string('user_id').notNullable();
      table.string('game_id').notNullable();
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('users'),
    knex.schema.dropTable('games'),
    knex.schema.dropTable('messages')
  ])
};
