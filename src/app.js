import express from "express"
import cookieParser from "cookie-parser"
import cors from "cors"

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true , limit: "16kb"}))
app.use(express.static("public"))

app.use(cookieParser())

app.get("/", (req, res) => {
  res.send("API is working");
});

//routes

import userRouter from './routes/user.routes.js'


//routes declaration
app.use("/api/v1/users",userRouter)
  


export {app}