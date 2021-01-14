import cors from 'cors';

const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:3000/',

  'https://pi-parkiraj-me-frontend.herokuapp.com',
  'https://pi-parkiraj-me-frontend.herokuapp.com/',

  'http://app.parkirajme.xyz',
  'http://app.parkirajme.xyz/',

  'http://frontend-local.parkirajme.xyz:3000',
  'http://frontend-local.parkirajme.xyz:3000/',

  'https://frontend-local.parkirajme.xyz:3000',
  'https://frontend-local.parkirajme.xyz:3000/',
];

export const corsMiddleware = cors({
  origin: allowedOrigins,
  credentials: true,
});
