//ENV variables
require("dotenv").config();

import express from "express"
import config from "config"

const app = express()

//JSON middleware
app.use(express.json())

// DB
import db from "../config/db"

//Routes
import router from "./router"

//Logger
import Logger from "../config/logger"

//Middlewares
    //Morgan Middlwware
    import morganMiddlware from "./middleware/morganMiddleware"

    //Prefixo de url
    app.use(morganMiddlware)

 app.use("/api/", router)


// App port
const port = config.get<number>("port");

app.listen(3000, async() =>{

    await db();

    Logger.info("Aplicação rodando na porta "+port)
});