var config = require('../knexfile.js');
var env = 'development';
var knex = require('knex')(config[env]);
var Games = module.exports;

Games.create = function(game) {
  return knex
    .insert(game)
    .into('games')
}

Games.insert = function(move) {
	return knex.transaction(function(trx){
		return trx
			.insert(move)
			.into('moves')
	})
}

Games.fetchPosition = function() {
	return knex
		.select()
		.from('moves')
		.where({game_id: game_id})
		.orderBy('move_id', 'desc')
		.limit(1);
}