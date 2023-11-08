import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { createAccessToken } from '../../utils/jwt.js';
import UserModel from '../models/user.model.js';
const TOKEN_SECRET = 'secret';

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userFound = await UserModel.findOne({ email });

    if (!userFound)
      return res.status(400).json({
        message: ['The email does not exist']
      });

    const isMatch = await bcrypt.compare(password, userFound.password);

    if (!isMatch) {
      return res.status(400).json({
        message: ['The password is incorrect']
      });
    }

    const token = await createAccessToken({
      id: userFound._id,
      username: userFound.username
    });

    res.cookie('token', token);

    res.json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Generar un hash de la contraseña
    const saltRounds = 10; // Número de rondas de sal para la encriptación
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = new UserModel({
      username,
      email,
      password: hashedPassword // Guarda la contraseña encriptada en la base de datos
    });

    await newUser.save();
    res.send({ message: 'register' });
  } catch (error) {
    console.error('Error al registrar al usuario:', error);
    res.status(500).send({ error: 'Error al registrar al usuario' });
  }
};

const verifyToken = async (req, res) => {
  const { token } = req.cookies;
  if (!token) return res.send(false);

  jwt.verify(token, TOKEN_SECRET, async (error, user) => {
    if (error) return res.sendStatus(401);

    const userFound = await UserModel.findById(user.id);
    if (!userFound) return res.sendStatus(401);

    return res.json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email
    });
  });
};

export { login, register, verifyToken };
