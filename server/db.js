// var env = 'development';
// var config = require('../knexfile.js');
// var knex = require('knex')(config[env]);

// module.exports = knex;

// knex.migrate.latest([config]);



var environment = process.env.NODE_ENV || 'development';
var config = require('../knexfile.js')[environment];
var knex = require('knex')(config);
knex.migrate.latest([config]);

module.exports = require('knex')(config);