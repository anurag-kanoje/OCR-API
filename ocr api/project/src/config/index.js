export const config = {
  port: process.env.PORT || 3000,
  cors: {
    origin: process.env.CORS_ORIGIN || '*',
    methods: ['GET', 'POST']
  },
  maxFileSize: 5 * 1024 * 1024 // 5MB
};