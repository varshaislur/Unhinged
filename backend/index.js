import express from "express"
import cors from "cors"
import bodyParser from "body-parser"
import helmet from "helmet" // this is used for some security thing
import morgan from "morgan"
import dotenv from "dotenv"
import dbConnection from "./db_connection/connection.js"
import errorMiddleware from "./middleware/errorMiddleware.js"
import router from "./routes/index.js"
import path from "path"

const __dirname = path.resolve(path.dirname(""));


dotenv.config();
//console.log(process.env.JWT_SECRET)

const app =express();

app.use(express.static(path.join(__dirname, "views/build")));

const PORT= process.env.PORT || 8080


dbConnection();

//middlewares
app.use(express.json())
app.use(express.urlencoded({extended:true}))
// app.use(morgan("dev"))
app.use(router)
app.use(errorMiddleware)

app.use(cors);
app.use(helmet())

app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
  });


