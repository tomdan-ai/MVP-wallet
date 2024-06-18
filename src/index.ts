import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

import userRoutes from './routes/UserRoutes';
import transactionRoutes from './routes/TransactionRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use('/api', userRoutes);
app.use('/api', transactionRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
