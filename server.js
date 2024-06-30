const mongoose = require('mongoose');

const dotenv = require('dotenv');
const app = require('./app');

process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION! 🔴 Shutting Down...');
  console.log(err.name, err.message);
});

dotenv.config({ path: './config.env' });
//onst app = require('./app');

//console.log(process.env);

if (!process.env.DATABASE) {
  console.error('DATABASE environment variable is not defined!');
  process.exit(1); // Exit the process with an error
}

const DB = process.env.DATABASE.replace(
  '<password>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
    // useCreateIndex: true, // Uncomment if needed
    // useFindAndModify: false // Uncomment if needed
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
});

// process.on('unhandledRejecton', (err) => {
//   console.log(err.name, err.message);
//   console.log('UNHANDLED REJECTION! 🔴 Shutting Down...');
//   server.close(() => {
//     process.exit(1);
//   });
// });

process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  server.close(() => {
    console.log('HTTP server closed');
  });
});

module.exports = app;
