import jwt from 'jsonwebtoken';
import config from '../config';

export function createAccessToken(payload) {
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      config.SECRET,
      {
        expiresIn: 86400, // 24 hours
      },
      (err, token) => {
        if (err) reject(err);
        resolve(token);
      },
    );
  });
}
