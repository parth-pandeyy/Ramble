const mongoose = require('mongoose');

const dotenv = require('dotenv');

process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION! 🔴 Shutting Down...');
  console.log(err.name, err.message);
});

dotenv.config({ path: './config.env' });
//onst app = require('./app');

//console.log(process.env);

const DB = process.env.DATABASE.replace(
  '<password>',
  process.env.DATABASE_PASSWORD
);

// mongoose
//   .connect(DB)
//   .then(() => console.log('DB connection successfull🫠'))
//   .catch((error) => {
//     console.error('DB conncetion failed:', error);
//   });

mongoose
  .connect(DB, {
    useNewUrlParser: true
    // useCreateIndex: true,
    // useFindAndModify: false,
  })
  .then(() => console.log('DB connection successfull🫠'));

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

module.exports = app;
