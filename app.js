import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import ExpressMongoSanitize from 'express-mongo-sanitize';
import xss from 'xss-clean';
import hpp from 'hpp';

import express from 'express';
import morgan from 'morgan';
import path from 'path';

import tourRoutes from './routes/tourRoutes.js';
import userRoutes from './routes/userRoutes.js';

const app = express();

// 1) Global Middlewears***********

// Set Security HTTP headers
app.use(helmet());

// Limit requuest from same api
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many request from this IP, please try again in an hour!',
});

app.use('/api', limiter);

// Development login
app.use(morgan('dev'));

// Body parser reading data from body into req.body
app.use(express.json({ limit: '100k' }));

// serving static files
app.use(express.static(path.resolve('public')));

// Test middleware
app.use((req, res, next) => {
  req.requestTime = new Date();
  next();
});

// Data sanitization against NoSQL query injection
app.use(ExpressMongoSanitize());

// Data sanitization against XSS
app.use(xss());

// Prevent parameter pollution
app.use(
  hpp({
    whitelist: [
      'duration',
      'ratingsQuantity',
      'ratingsAverage',
      'maxGroupSize',
      'difficulty',
      'price',
    ],
  })
);

// 3)  Routes**************************

app.use('/api/v1/tours', tourRoutes);
app.use('/api/v1/users', userRoutes);

app.all('*', (req, res, next) => {
  const err = new Error(`cant find ${req.originalUrl} on this server`);
  err.status = 'fail';
  err.statusCode = 404;
  next(err);
});

app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
});

export default app;
