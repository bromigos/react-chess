exports.up = function(knex, Promise) {
  return Promise.all([
  	knex.schema.createTable('users', function(table){
      table.increments('user_id');
      table.string('user_name');
      table.string('game_id');
      table.integer('num_wins');
      table.integer('num_losses');
  	}),
    knex.schema.createTable('games', function(table){
      table.string('game_id');
      table.string('user1_id');
      table.string('user2_id');
      table.string('user1_orientation');
      table.string('user2_orientation');
      table.string('turn_time');
      table.boolean('real_time');
      table.string('position');
    }),
    knex.schema.createTable('messages', function(table){
      table.increments('message_id');
      table.string('content');
      table.string('user_id');
      table.string('game_id');
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
