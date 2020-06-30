module.exports = {
  development: {
    username: 'postgres',
    password: 'postgres',
    database: 'myplayoff_development',
    host: '127.0.0.1',
    dialect: 'postgres',
    logging: (msg) => console.log('[DATABASE]', msg)
  },
  test: {
    username: 'postgres',
    password: 'postgres',
    database: 'myplayoff_test',
    host: '127.0.0.1',
    dialect: 'postgres',
    logging: false
  },
  production: {
    username: 'j_organise_u_6981',
    password: 'GDIIzkB5aifDBYrpo3mW',
    database: 'myplayoff_production',
    host: 'j-organise-u-6981.postgresql.dbs.scalingo.com',
    port: '32283',
    dialect: 'postgres',
    logging: (msg) => console.log('[DATABASE]', msg)
  }
}
