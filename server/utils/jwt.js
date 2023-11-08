import jwt from 'jsonwebtoken';

const TOKEN_SECRET = 'secret';

export const createAccessToken = async payload => {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, TOKEN_SECRET, { expiresIn: '1d' }, (err, token) => {
      if (err) reject(err);
      resolve(token);
    });
  });
};
