import mongoose from "mongoose";
import { DB_NAME, COLORS } from "../constants.js";

const connectDb = async () => {
  try {
    const connection = await mongoose.connect(
      `${process.env.MONGODB_URI}/${DB_NAME}`
    );
    console.log(
      `${COLORS.green}[DB] [INFO]${COLORS.reset} MONGODB connected !! DB HOST: ${connection.connection.host}`
    );
  } catch (error) {
    console.log(
      `${COLORS.red}[DB] [ERROR]${COLORS.reset} MONGODB connection error:`,
      error
    );
    process.exit(1);
  }
};

export default connectDb;
