const cors = require('cors');

const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:3000/',
  'https://pi-parkiraj-me-frontend.herokuapp.com',
  'https://pi-parkiraj-me-frontend.herokuapp.com/',
];

export const corsMiddleware = cors({
  origin: allowedOrigins,
  credentials: true,
});
