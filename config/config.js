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
    username: 'postgres',
    password: 'postgres',
    database: 'myplayoff_production',
    host: '127.0.0.1',
    dialect: 'postgres',
    logging: (msg) => console.log('[DATABASE]', msg)
  }
}
