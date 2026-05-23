import express from 'express';
import userRoutes from './routes/user-routes';
import bookRoutes from './routes/book-routes';
import loanRoutes from './routes/loan-routes';
import { errorHandler } from './middlewares/error-handler';

const app = express();

app.use(express.json());

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK' });
});

app.use('/users', userRoutes);
app.use('/books', bookRoutes);
app.use('/loans', loanRoutes);

app.use(errorHandler);

export default app;