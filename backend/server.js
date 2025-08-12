import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';


dotenv.config(); //Loading the environment variables before anything else


connectDB(); // Calling the function to connect to the database

const app = express();


app.use(cors()); //CORS middleware used


app.use(express.json()); //Express's built-in JSON parser is used for request bodies


app.get('/', (req, res) => {
  res.send('API is running...');
});

//API routes mount
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/upload', uploadRoutes);

// Make the 'uploads' folder static
const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));


const PORT = process.env.PORT || 5000;


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));