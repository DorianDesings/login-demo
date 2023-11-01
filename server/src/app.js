import cors from 'cors';
import express from 'express';
import { databaseConnect } from '../database/db.js';
import userRoutes from './routes/user.routes.js';
const PORT = 3000;
const app = express();

// Rutas

// Middlewares para cliente
app.use(cors());
app.use(express.json());

// Uso de rutas
app.use('/api', userRoutes);

// Inicio del servidor
const startServer = async () => {
  await databaseConnect();
  app.listen(PORT, console.log(`Server listen on port ${PORT}`));
};

startServer();
