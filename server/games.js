var config = require('../knexfile.js');
var env = 'development';
var knex = require('knex')(config[env]);
var Games = module.exports;

Games.create = function(game) {
  return knex.transaction(function(trx){
    return trx
      .insert(game)
      .into('games')
  })
}

Games.addUser = function(user) {
  return knex('games')
    .where({game_id: game_id})
    .update({user2_id: user})
}

Games.update = function(move) {
  return knex('games')
    .where({game_id: game_id})
    .update({position: move.pgnString})
}

Games.fetchPosition = function() {
	return knex
		.select()
		.from('moves')
		.where({game_id: game_id})
		.orderBy('move_id', 'desc')
		.limit(1)
}

Games.getGameByUUID = function(uuid){
	return knex
		.select()
		.from('games')
		.where({user1_id: uuid})
		.orWhere({user2_id: uuid})
   .andWhere({inProgress: true});
 }
//==================hopefully good code above, ignore below
      // table.string('game_id');
      // table.string('user1_id');
      // table.string('user2_id');
      // table.string('user1_orientation');
      // table.string('user2_orientation');
      // table.string('turn_time');
      // table.boolean('real_time');
      // table.string('position'); //pgnString

// var pgn = `[Event "Chessboard Editor at Apronus.com"]
// [Site "http://www.apronus.com/chess/wbeditor.php"]
// [Date "2016.09.01"]
// [Round "-"]
// [White "?"]
// [Black "?"]
// [Result "*"]
// [SetUp "1"]
// [FEN "rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq - 0 1"]`;



// 	var testResponse = {
// 		game_id: 666,
// 		user1_id: 1,
// 		user2_id: "99fa22b1-492b-45df-8ffe-9c3f96607051",
// 		user1_orientation: 'white',
// 		user2_orientation: 'black',
// 		turn_time: '6',
// 		real_time: '0',
// 		position: pgn,
// 		inProgress: true
// 	};





// 	return testResponse; 
// }