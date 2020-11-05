require('dotenv-flow').config();

const express = require('express');

// Routers
const sessionRouter = require('./routes/session.router');

// Middlewares
const sessionMiddleware = require('./middleware/session');

const app = express();

const port = process.env.PORT || 3000;

// Parse body middleware
app.use(express.json());

// Session middleware
app.use(sessionMiddleware);

app.use('/session', sessionRouter);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
