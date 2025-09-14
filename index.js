import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import leadRoutes from './routes/leadRoutes.js';
import cors from "cors";


dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors({
  origin: 'https://lead-management-frontend-erino.vercel.app', 
  credentials: true, 
}));

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


app.get('/', (req, res) => {
  res.send('API is running...');
});
app.use('/api/auth', authRoutes);
app.use('/api/leads', leadRoutes);



const startServer = async () => {
  try {
    await connectDB(); 
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to connect to the database', error);
    process.exit(1);
  }
};

startServer();