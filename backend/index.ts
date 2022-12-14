require('dotenv-flow').config();

import express from 'express';

import { initModels } from './db/connectModels';

// Routers
import { sessionRouter } from './routes/session.router';
import { userRouter } from './routes/user.router';
import { registrationRouter } from './routes/registration.router';
import { vehicleRouter } from './routes/vehicle.router';
import { parkingRouter } from './routes/parking.router';
import { reservationRouter } from './routes/reservation.router';

// Middlewares
import { sessionMiddleware } from './middlewares/session';
import { corsMiddleware } from './middlewares/cors';

initModels().then(() => {
  console.log('Baza spojena');
});

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
app.use('/vehicle', vehicleRouter);
app.use('/parking', parkingRouter);
app.use('/reservation', reservationRouter);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
