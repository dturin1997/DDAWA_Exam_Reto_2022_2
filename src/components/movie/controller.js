import { PrismaClient } from "@prisma/client";

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
        return res.json({
            info: "Can't create movie",
            error: err.message
        })
    }
}

//READ ALL and Search 
export const readAll = async(req, res) =>{
    try{

        const { name, gender, order } = req.query
      let search;
  
      if(name){
          const searchByName = await prisma.movie.findMany({
              where: {
                  title: name,
              },
              select: {
                id: true,
                image: true,    
                title: true,
                date_created: true
              }
          })
          search = searchByName;
      }
      else if(gender){
          const searchByGenre = await prisma.genre.findMany({
              where: {
                  name: gender,
              },
              include: {
                movies: true
              }
          })
          search = searchByGenre;
      }
      else if(order){
          const searchByOrder = await prisma.movie.findMany({
              orderBy: {
                date_created: order,
              },
          })
          search = searchByOrder;
  
      }else if(name == "" || gender =="" || order == ""){
        return res.json({
            info: "No hay parámetro",
        })
      }else{
        const findAll = await prisma.movie.findMany({
            select:{
                image: true,    
                title: true,
                date_created: true
            }
        })
        search = findAll;
      }

    return res.json(search)
    }catch (err) {
        return res.json({
            error: err.message
        })
      }
}

////detalles
export const readOne = async(req, res) =>{
    try{
        const { id } = req.params
        const findOne = await prisma.movie.findUnique({
            where: {
                id: Number(id),
            },
            include: {
                characters: {
                    include: {
                        character: true
                    }
                }
            }
        })
        return res.json(findOne)
    }catch (err) {
        console.log(err);
        return res.json({
            info: "Can't read that movie",
            error: err.message
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
            info: "Can't update movie",
            error: err.message
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