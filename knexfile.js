module.exports = {
  test: {
    client: 'pg',
    connection: 'postgres://localhost/chess_db_test',
    migrations: {
      directory: __dirname + '/migrations'
    }
  },
  development: {
    client: 'pg',
    connection: 'postgres://localhost/chess_db',
    migrations: {
      directory: __dirname + '/migrations'
    }
  },
  production: {
        client: 'pg',
    connection: {
      database: 'dahp9elepqegto',
      user:     'luixlfsteuinfe',
      password: 'heK8lqCHmbhh_ucHT9x8fcP51b'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: __dirname + '/migrations'
    }
  }
};

// // Update with your config settings.

// module.exports = {

//   development: {
//     client: 'sqlite3',
//     connection: {
//       filename: './dev.sqlite3'
//     }
//   },

//   staging: {
//     client: 'postgresql',
//     connection: {
//       database: 'my_db',
//       user:     'username',
//       password: 'password'
//     },
//     pool: {
//       min: 2,
//       max: 10
//     },
//     migrations: {
//       tableName: 'knex_migrations'
//     }
//   },

//   production: {
//     client: 'postgresql',
//     connection: {
//       database: 'my_db',
//       user:     'username',
//       password: 'password'
//     },
//     pool: {
//       min: 2,
//       max: 10
//     },
//     migrations: {
//       tableName: 'knex_migrations'
//     }
//   }

// };
