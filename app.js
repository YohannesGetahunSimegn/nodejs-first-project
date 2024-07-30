import express from 'express';
// const morgan = fs.readFile('morgan');
import { promises as fs } from 'fs';

import tourRoutes from './routes/tourRoutes.js';
import userRoutes from './routes/userRoutes.js';

const app = express();

// 1) Middlewears***********
// console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
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
