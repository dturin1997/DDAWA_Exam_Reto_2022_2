import { PrismaClient } from "@prisma/client";
//import set from 'date-fns';
//We create a instance of PrismaClient
const prisma = new PrismaClient();
//We define a asynchronous function to send queries to DB

//CREATE
export const create = async(req, res) => {    
    try{
    const { image, title, date_created, score } = req.body;
        // Validate user input
    if (!(image && title && date_created && score)) {
    return res.status(400).send("All input is required");
    }
    const createMovie= await prisma.movie.create({
        data:{    
            image,    
            title,
            date_created: new Date(date_created),
            score,
        }
    })
        // return new movie   
        return res.status(201).json({
        data:createMovie,
        info: "Movie created",
    });
    } catch (err) {
        console.log(err);
    }
}

////READ
export const readAll = async(req, res) =>{
    try{
        const findAll = await prisma.movie.findMany()
        return res.json(findAll)
    }catch (err) {
        console.log(err);
      }
}

export const readOne = async(req, res) =>{
    try{
        const { id } = req.params
        const findOne = await prisma.movie.findUnique({
            where: {
                id: Number(id),
            }
        })
        return res.json(findOne)
    }catch (err) {
        console.log(err);
        return res.json({
            info: "Can't read that movie"
        })
      }
}

//UPDATE
export const update = async(req, res) =>{
    try{
        const { id } = req.params
        const { image, title, date_created, score } = req.body;
        const updateMovie = await prisma.movie.update({
            where: {
                id: Number(id),
            },
            data:{    
                image: image,    
                title: title,
                date_created: new Date(date_created),
                score: score,
            },
        })
        return res.json(updateMovie)
    }catch (err) {
        console.log(err);
        return res.json({
            info: "Can't update movie"
        })
      }
}

//DELETE
export const deleteOne = async(req, res) =>{
    try{
        const { id } = req.params
        const deleteMovie = await prisma.movie.delete({
            where: {
                id: Number(id),
            },
        })
        return res.json({
            info:"Movie deleted",
            data: deleteMovie
            
        })
    }catch (err) {
        console.log(err);
        return res.json({
            info: "Movie already deleted"
        })
      }
}