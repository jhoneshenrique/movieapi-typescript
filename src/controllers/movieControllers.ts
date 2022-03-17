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
        return res.status(500).json({error:"Por favor, tente mais tarde"})
    }
}

export async function findMovieById(req:Request, res:Response) {
    try {
        const id = req.params.id;
        const movie = await MovieModel.findById(id)

        if(!movie){
            return res.status(404).json({error: "O filme não existe"})
        }

        return res.status(200).json(movie)

    } catch (e:any) {
        Logger.error("Erro no sistema "+e.message)
        return res.status(500).json({error:"Por favor, tente mais tarde"})
    }
}

export async function getAllMovies(req:Request, res:Response) {
    try {
        const movies = await MovieModel.find()
        return res.status(200).json(movies)
    } catch (e:any) {
        Logger.error("Erro no sistema "+e.message)
        return res.status(500).json({error:"Por favor, tente mais tarde"})
    }
}

export async function removeMovie(req:Request, res:Response) {
    try {
        const id = req.params.id
        const movie = await MovieModel.findById(id)

        if(!movie){
            return res.status(404).json({error:"O filme não existe"})
        }

        await movie.delete()

        return res.status(200).json({msg:"Filme removido com sucesso!"})

    } catch (e:any) {
        Logger.error("Erro no sistema "+e.message)
        return res.status(500).json({error:"Por favor, tente mais tarde"})
    }
}

export async function updateMovie(req:Request,res:Response) {
    try {
        //Pega o id do filme
        const id = req.params.id
        //Pega o resto dos dados que vem pela requisição
        const data = req.body;

        const movie = await MovieModel.findById(id)

        if(!movie){
            return res.status(404).json({error:"O filme não existe"})
        }

        await MovieModel.updateOne({_id: id},data);

        return res.status(200).json(data);
    } catch (e:any) {
        Logger.error("Erro no sistema "+e.message)
        return res.status(500).json({error:"Por favor, tente mais tarde"})
    }
}