import { PrismaClient } from "@prisma/client";

//We create a instance of PrismaClient
const prisma = new PrismaClient();
//We define a asynchronous function to send queries to DB

//CREATE
export const create = async(req, res) => {    
    try{
    const { image, name, birth_date, weight, history } = req.body;
        // Validate user input
    if (!(image && name && birth_date && weight && history)) {
    return res.status(400).send("All input is required");
    }
    const createCharacter = await prisma.character.create({
        data:{
            image,     
            name,    
            birth_date: new Date(birth_date),
            weight,     
            history,   
 
        }
    })
        // return new character
    return res.status(201).json({
        data: createCharacter,
        info: "Character created",
    });
    } catch (err) {
        console.log(err);
    }
}

//READ ALL and Search
export const readAll = async(req, res) =>{
    try{

    const { name, age, movies } = req.query
    let search;

    if(name){
        const searchByName = await prisma.character.findMany({
            where: {
                name: name,
            },
            select: {
                id: true,
                image: true,
                name: true,        
                birth_date: true,
                weight: true,     
                history: true, 
            }
        })
        search = searchByName;
    }
    else if(age){
        const searchByAge = await prisma.character.findMany({
            where: {
                birth_date: new Date(age),
            },
            select: {
                id: true,
                image: true,
                name: true,        
                birth_date: true,
                weight: true,     
                history: true, 
            }
        })
        search = searchByAge;
    }
    else if(movies){
        const searchByIdMovie = await prisma.charactersOnMovies.findMany({
            where: {
                movieId: Number(movies),
            },
            include: {
                character: true
            }
        })
        search = searchByIdMovie;

    }else if ( name == "" || age =="" || movies == ""){
        
        return res.json({
            info: "No hay parámetro",
        })
        
    }else{
        const findAll = await prisma.character.findMany({
            select:{
                image: true,
                name: true
            }
        })
        search = findAll

    }

        return res.json(search);
     
    }catch (err) {
        return res.json({
            error: err.message
        })
      }
}

///Detalles
export const readOne = async(req, res) =>{
    try{
        const { id } = req.params
        const findOne = await prisma.character.findUnique({
            where: {
                id: Number(id),
            },
            include: {
                movies: {
                    include: {
                        movie: true
                    }
                }
            }
        })
        return res.json(findOne)
    }catch (err) {
        console.log(err);
        return res.json({
            info: "Can't read that character",
            error: err.message
        })
      }
}



//UPDATE
export const update = async(req, res) =>{
    try{
        const { id } = req.params
        const { image, name, birth_date, weight, history } = req.body;
        const updateCharacter = await prisma.character.update({
            where: {
                id: Number(id),
            },
            data: {
                image: image, 
                name: name,
                birth_date: new Date(birth_date),
                weight: weight,
                history: history 
            },
        })
        return res.json(updateCharacter)
    }catch (err) {
        console.log(err);
        return res.json({
            info: "Can't update character",
            error: err.message
        })
      }
}

//DELETE
export const deleteOne = async(req, res) =>{
    try{
        const { id } = req.params
        const deleteCharacter = await prisma.character.delete({
            where: {
                id: Number(id),
            },
        })
        return res.json({
            info:"Character deleted",
            data: deleteCharacter
            
        })
    }catch (err) {
        console.log(err.message);
        return res.json({
            info: "Character already deleted",
        })
      }
}
