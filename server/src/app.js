import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import { databaseConnect } from '../database/db.js';
import authRoutes from './routes/auth.routes.js';
const PORT = 3000;
const app = express();

// Configuración de CORS
const corsOptions = {
  origin: 'http://localhost:5173',
  methods: 'GET,PUT,POST,DELETE',
  credentials: true, // Habilita las credenciales (cookies, autenticación)
  optionsSuccessStatus: 204 // Establece el código de estado 204 para las solicitudes OPTIONS exitosas
};

// Rutas

// Middlewares para cliente
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

// Uso de rutas
app.use(authRoutes);

// Inicio del servidor
const startServer = async () => {
  await databaseConnect();
  app.listen(PORT, console.log(`Server listen on port ${PORT}`));
};

startServer();
