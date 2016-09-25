// var env = 'development';
// var config = require('../knexfile.js');
// var knex = require('knex')(config[env]);

// module.exports = knex;

// knex.migrate.latest([config]);



var environment = process.env.NODE_ENV || 'development';
var config = require('../knexfile.js')[environment];

module.exports = require('knex')(config);