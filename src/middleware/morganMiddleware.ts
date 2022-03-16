import morgan, {StreamOptions} from "morgan"

import config from "config"

import Logger from "../../config/logger"

//stream para ler as requisições http
const stream:StreamOptions = {
    write: (message) => Logger.http(message)
};

//Caso queiramos desligar a leitura dos Logs em produção
const skip = ()=> {
    const env = config.get<string>("env") || "development"
    return env !== "development"
}

const morganMiddleware = morgan(
    ":method :url :res[content-length] - :response-time ms",
    {stream,skip} 
)

export default morganMiddleware;