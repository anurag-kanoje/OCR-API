export const authConfig = {
  jwt: {
    secret: process.env.JWT_SECRET || 'your-secret-key',
    expiresIn: '24h'
  },
  roles: {
    ADMIN: 'admin',
    USER: 'user'
  }
};