import cors from 'cors';

const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:3000/',

  'http://frontend-local.herokuapp.com:3000',
  'http://frontend-local.herokuapp.com:3000/',

  'https://pi-parkiraj-me-frontend.herokuapp.com',
  'https://pi-parkiraj-me-frontend.herokuapp.com/',

  'http://app.parkirajme.xyz',
  'http://app.parkirajme.xyz/',

  'http://frontend-local.parkirajme.xyz',
  'http://frontend-local.parkirajme.xyz/',
];

export const corsMiddleware = cors({
  origin: allowedOrigins,
  credentials: true,
});
