import {Request, Response} from "express"

//Model
import { MovieModel } from "../models/Movie"

//Logger
import Logger from "../../config/logger"

export async function createMovie(req:Request,res:Response) {
    try {
       //Pega o corpo da requisição 
       const data = req.body;
       //Passa os dados para criação e espera o resultado
       const movie = await MovieModel.create(data)
       //Retorna o statsu 201 e o filme que foi criado
       return res.status(201).json(movie)
    } catch (e:any) {
        Logger.error("Erro no sistema "+e.message)
    }
}