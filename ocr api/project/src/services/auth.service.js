import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { authConfig } from '../config/auth.js';

class AuthService {
  async generateToken(user) {
    return jwt.sign(
      { id: user.id, role: user.role },
      authConfig.jwt.secret,
      { expiresIn: authConfig.jwt.expiresIn }
    );
  }

  async hashPassword(password) {
    return bcrypt.hash(password, 10);
  }

  async comparePasswords(password, hash) {
    return bcrypt.compare(password, hash);
  }
}

export const authService = new AuthService();