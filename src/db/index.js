import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async () => {
    try {
        console.log("MONGODB_URI:", process.env.MONGODB_URI); // check env loading
        console.log("DB_NAME:", DB_NAME);                      // check constant value

        const connectionString = `${process.env.MONGODB_URI}/${DB_NAME}`;
        console.log("Final Connection String:", connectionString); // see full URI

        const connectionInstance = await mongoose.connect(connectionString);

        console.log(`\nMONGODB connected!! DB HOST: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log("ERROR: ", error);
        process.exit(1);
    }
};

export default connectDB;
