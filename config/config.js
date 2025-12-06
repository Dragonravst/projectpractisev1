require('dotenv').config();  // Load environment variables from .env

module.exports = {
  development: {
    username: process.env.DB_USER || 'postgres',  // Fallback to 'postgres' if not set
    password: process.env.DB_PASS || 'Akash',     // Fallback to 'Akash' if not set
    database: process.env.DB_NAME || 'practise',  // Fallback to 'practise' if not set
    host: process.env.DB_HOST || 'localhost',     // Fallback to 'localhost' if not set
    port: process.env.DB_PORT || 5432,            // Fallback to 5432 if not set
    dialect: 'postgres',
    logging: false,
  },
  test: {
    username: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASS || 'Akash',
    database: process.env.DB_NAME_TEST || 'practise_test',  // Use a separate test DB var if needed
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    dialect: 'postgres',
    logging: false,
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'postgres',
    logging: false,
  },
};