require('dotenv').config();
const mongoose = require('mongoose');

const { DB_HOST, DB_NAME, DB_PORT } = process.env;

const mongoUri = `mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`;

const connectDb = async () => {
  try {
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`Connected to MongoDB at ${mongoUri}`);
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error;
  }
};

module.exports = connectDb;
