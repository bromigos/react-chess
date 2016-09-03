var config = require('../knexfile.js');
var env = 'development';
var knex = require('knex')(config[env]);
var Games = module.exports;

Games.create = function(game) {
    return knex
      .insert(game)
      .into('games')
      .then(x=>x);
}

Games.addUser = function(user) { 
  return knex('games') 				
    .where({game_id: user.game_id})
    .andWhere({user2_id: 0})
    .update({user2_id: user.uuid})
}

Games.update = function(move) {
  console.log("move: ", move)
  return knex('games')
    .where({game_id: move.game_id})
    .update({position: move.position})
}

Games.checkForOpponent = function(gameId) {
  console.log("gameId",gameId);
  return knex
    .select()
    .from('games')
    .where({game_id: gameId})
    .andWhere({user2_id: "0"})
}

Games.getGameByUUID = function(uuid){
	return knex
		.select()
		.from('games')
		.where({user1_id: uuid})
		.orWhere({user2_id: uuid})
   .andWhere({inProgress: true});
 }
