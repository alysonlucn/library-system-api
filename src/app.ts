import express from 'express';
import userRoutes from './routes/user-routes';

const app = express();

app.use(express.json());

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK' });
});

app.use('/users', userRoutes);

export default app;