var config = require('../knexfile.js');
var env = 'development';
var knex = require('knex')(config[env]);
var Chats = module.exports;

Chats.insert = function(message) {
  return knex.transaction(function(trx){
    return trx
      .insert(message)
      .into('messages')
  })
}

Chats.fetchMessages = function(){
  return knex
    .select()
    .from('messages')
    .where({game_id: 'lobby'})
    .orderBy('message_id', 'desc')
    .limit(25)
}