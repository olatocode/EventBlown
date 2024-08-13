/** @format */

import mongoose from 'mongoose';

const connectMongoDB = async (): Promise<void> => {
  try {
    await mongoose.connect(process.env.DATABASE_URL as string);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error((error as Error).message);
    console.error('Database Not Connected');
  }
};

const db = connectMongoDB();
export default db;
