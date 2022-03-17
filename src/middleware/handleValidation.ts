import {Request, Response, NextFunction} from "express"
import { validationResult } from "express-validator"

export const validate = (req:Request, res:Response, next: NextFunction) =>{
    //Pega os erros que vieram da requisição
    const erros = validationResult(req)

    if(erros.isEmpty()){
        return next()
    }

    //guarda os erros num array de objetos
    const extractedErros: object[] = [];

    //insere cada erro em extractedErros
    erros.array().map((err) => extractedErros.push({[err.param]:err.msg}))

    return res.status(422).json({
        errors: extractedErros
    })
}