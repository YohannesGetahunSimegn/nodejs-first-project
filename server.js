import mongoose from 'mongoose';
import app from './app.js';
import dotenv from 'dotenv';
dotenv.config();

let databaseUrl = process.env.DATABASE;
const databasepassword = process.env.DATABASE_PASSWORD;

databaseUrl = databaseUrl.replace('<password>', databasepassword);

mongoose
  .connect(databaseUrl)
  .then(() => console.log('Database connected'))
  .catch((err) => console.error('Database connection error:', err));

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
