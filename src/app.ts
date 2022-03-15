import express from "express"
import config from "config"

const app = express()

//JSON middleware
app.use(express.json())

//Routes
import router from "./router"

    //Prefixo de url
app.use("/api/", router)



// App port
const port = config.get<number>("port");

app.listen(3000, async() =>{
    console.log("Aplicação rodando na porta "+port)
});