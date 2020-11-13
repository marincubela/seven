import session from 'express-session';
const SequelizeStore = require('connect-session-sequelize')(session.Store);

import { db } from '../db/connect';

const sessionStore = new SequelizeStore({
  db,
});

sessionStore.sync();

export const sessionMiddleware = (app) => {
  console.log('App is running in: ', app.get('env'));

  if (app.get('env') === 'production') {
    app.set('trust proxy', 1);
  }

  return session({
    secret: 'parkiraj-me-2020',
    store: sessionStore,
    resave: true,
    saveUninitialized: false,
    name: 'pm-session',
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 30, // 30 days
      sameSite: app.get('env') === 'production' ? 'none' : undefined,
      secure: app.get('env') === 'production',
    },
  });
};
