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
  console.log('Hello from the middleware 👋');
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date();
  next();
});

// 3)  Routes**************************

app.use('/api/v1/tours', tourRoutes);
app.use('/api/v1/users', userRoutes);

export default app;
