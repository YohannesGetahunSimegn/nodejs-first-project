import express from 'express';
import morgan from 'morgan';

import tourRoutes from './routes/tourRoutes.js';
import userRoutes from './routes/userRoutes.js';

const app = express();

// 1) Middlewears***********

app.use(morgan('dev'));

app.use(express.json());
// app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
  req.requestTime = new Date();
  next();
});

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
