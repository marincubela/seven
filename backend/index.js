require('dotenv-flow').config();

const express = require('express');

// Routers
const sessionRouter = require('./routes/session.router');
const userRouter = require('./routes/user.router');
const registrationRouter = require('./routes/registration.router');

// Middlewares
const sessionMiddleware = require('./middleware/session');

const app = express();

const port = process.env.PORT || 3000;

// Parse body middleware
app.use(express.json());

// Session middleware
app.use(sessionMiddleware);

app.use('/session', sessionRouter);
app.use('/user', userRouter);
app.use('/registration', registrationRouter);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
