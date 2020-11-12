require('dotenv-flow').config();

import express from 'express';

// Routers
import { sessionRouter } from './routes/session.router';
import { userRouter } from './routes/user.router';
import { registrationRouter } from './routes/registration.router';

// Middlewares
import { sessionMiddleware } from './middlewares/session';
import { corsMiddleware } from './middlewares/cors';

const app = express();

const port = process.env.PORT || 5000;

// Parse body middleware
app.use(express.json());

// Cors middleware
app.use(corsMiddleware);

// Session middleware
app.use(sessionMiddleware(app));

app.use('/session', sessionRouter);
app.use('/user', userRouter);
app.use('/registration', registrationRouter);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
