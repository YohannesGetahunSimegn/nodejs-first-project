import { promises as fs } from 'fs';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
import app from './app.js';

// dotenv.config({ path: './.env' });
// const app = fs.readFile('./app');
// console.log(process.env.NODE_ENV);

const DB = process.env.DATABASE.replace(
  '<password>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log('DB Connection successful!'));

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running at${port}...`);
});
