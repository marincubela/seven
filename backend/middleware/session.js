const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const sequelize = require('../db/connect');

const sessionStore = new SequelizeStore({
  db: sequelize,
});

sessionStore.sync();

module.exports = session({
  secret: 'parkiraj-me-2020',
  store: sessionStore,
  resave: false,
  proxy: true,
});
