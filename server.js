import mongoose from 'mongoose';
import app from './app.js';

mongoose
  .connect(
    'mongodb+srv://yohag2gs:ERTaWSRO2hTBRyte@fullstackapp-ygs.zd641lt.mongodb.net/?retryWrites=true&w=majority&appName=fullstackapp-ygs'
  )
  .then(() => console.log('Database connected'))
  .catch((err) => console.error('Database connection error:', err));

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
