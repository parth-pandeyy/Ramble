const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./app');

process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION! 🔴 Shutting Down...');
  console.log(err.name, err.message);
});

dotenv.config({ path: './config.env' });

// Add logs to debug environment variables
console.log('DATABASE:', process.env.DATABASE);
console.log('DATABASE_PASSWORD:', process.env.DATABASE_PASSWORD);

if (!process.env.DATABASE || !process.env.DATABASE_PASSWORD) {
  console.error(
    'DATABASE or DATABASE_PASSWORD environment variable is not defined'
  );
  process.exit(1);
}

const DB = process.env.DATABASE.replace(
  '<password>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true
  })
  .then(() => console.log('DB connection successful🫠'))
  .catch((error) => {
    console.error('DB connection failed:', error);
  });

const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

process.on('unhandledRejection', (err) => {
  console.log('UNHANDLED REJECTION! 🔴 Shutting Down...');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});

module.exports = app;
