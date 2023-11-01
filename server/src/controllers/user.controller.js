import bcrypt from 'bcrypt';
import { createAccessToken } from '../../utils/jsw.js';
import UserModel from '../models/user.model.js';

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

    res.cookie('token', token, {
      httpOnly: process.env.NODE_ENV !== 'development',
      secure: true,
      sameSite: 'none'
    });

    res.json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export { login, register };
