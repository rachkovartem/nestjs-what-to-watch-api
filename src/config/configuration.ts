export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  database: {
    url: process.env.MONGODB_URL,
    saltOrRounds: process.env.BCRYPT_SALT,
  },
});
