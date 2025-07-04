import dotenv from 'dotenv';
dotenv.config(); 

import express from "express";
import { app } from './app.js'; 
import connectDB from './db/index.js';

const PORT = process.env.PORT || 8000;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running at port: ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("MongoDB connection failed!!", err);
  });








/*

import express from "express"
const app = express()

( async () => {
    try{
      await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)

      app.on("error" , (error) => {
        console.log("ERROR: ",error);
        throw error
      })

      app.listen(process.env.PORT, () => {
        console.log(`App is listening on port ${process.env.PORT}`);
      })
    }catch (error){
       console.error("ERROR :" , error)
       throw error
    }
} )()
    */