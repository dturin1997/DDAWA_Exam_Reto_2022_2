import { PrismaClient } from "@prisma/client";
//import set from 'date-fns';
//We create a instance of PrismaClient
const prisma = new PrismaClient();
//We define a asynchronous function to send queries to DB

//CREATE
export const create = async(req, res) => {    
    try{
    const { name, image, movieId } = req.body;
        // Validate user input
    if (!(name && image && movieId)) {
    return res.status(400).send("All input is required");
    }
    const createGenre= await prisma.genre.create({
        data:{
            name,     
            image,    
            movieId,   
 
        }
    })
        // return new genre    
        return res.status(201).json({
        data: createGenre,
        info: "Genre created",
    });
    } catch (err) {
        console.log(err);
        return res.json({
            info: "Can't create genre or maybe don't exist that movie ID"
        })
    }
}

////READ
export const readAll = async(req, res) =>{
    try{
        const findAll = await prisma.genre.findMany()
        return res.json(findAll)
    }catch (err) {
        console.log(err);
      }
}

export const readOne = async(req, res) =>{
    try{
        const { id } = req.params
        const findOne = await prisma.genre.findUnique({
            where: {
                id: Number(id),
            }
        })
        return res.json(findOne)
    }catch (err) {
        console.log(err);
        return res.json({
            info: "Can't read that genre"
        })
      }
}

//UPDATE
export const update = async(req, res) =>{
    try{
        const { id } = req.params
        const { name, image, movieId } = req.body;
        const updateGenre = await prisma.genre.update({
            where: {
                id: Number(id),
            },
            data: {
                name: image, 
                image: name,
                movieId: movieId,
            },
        })
        return res.json(updateGenre)
    }catch (err) {
        console.log(err);
        return res.json({
            info: "Can't update genre"
        })
      }
}

//DELETE
export const deleteOne = async(req, res) =>{
    try{
        const { id } = req.params
        const deleteGenre = await prisma.genre.delete({
            where: {
                id: Number(id),
            },
        })
        return res.json({
            info:"Genre deleted",
            data: deleteGenre
            
        })
    }catch (err) {
        console.log(err);
        return res.json({
            info: "Genre already deleted"
        })
      }
}