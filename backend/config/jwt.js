const jwt = require('jsonwebtoken');

const JWT_EXPIRE = process.env.JWT_EXPIRE || '7d';

const getSecret = () => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error('JWT_SECRET is not set. Add it to backend/.env and restart the server.');
  }
  return secret;
};

const generateToken = (id, role) => {
  return jwt.sign({ id, role }, getSecret(), {
    expiresIn: JWT_EXPIRE,
  });
};

const verifyToken = (token) => {
  try {
    return jwt.verify(token, getSecret());
  } catch (error) {
    return null;
  }
};

module.exports = { generateToken, verifyToken };
