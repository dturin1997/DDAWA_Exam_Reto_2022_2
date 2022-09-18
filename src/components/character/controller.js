import { PrismaClient } from "@prisma/client";
//import set from 'date-fns';
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

//READ
export const readAll = async(req, res) =>{
    try{
        const findAll = await prisma.character.findMany()
        return res.json(findAll)
    }catch (err) {
        console.log(err);
      }
}

export const readOne = async(req, res) =>{
    try{
        const { id } = req.params
        const findOne = await prisma.character.findUnique({
            where: {
                id: Number(id),
            }
        })
        return res.json(findOne)
    }catch (err) {
        console.log(err);
        return res.json({
            info: "Can't create character"
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
            info: "Can't update character"
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
        console.log(err);
        return res.json({
            info: "Character already deleted"
        })
      }
}

//We call function main to catch any exception and with "finally", 
//We close the connection to the database when the script finishes
/* create()
    .catch((e)=>{
        console.log(e)
    }).finally(async ()=>{
        await prisma.$disconnect()
    })
readAll()
    .catch((e)=>{
        console.log(e)
    }).finally(async ()=>{
        await prisma.$disconnect()
    })
update()
    .catch((e)=>{
        console.log(e)
    }).finally(async ()=>{
        await prisma.$disconnect()
    })
deleteOne()
    .catch((e)=>{
        console.log(e)
    }).finally(async ()=>{
        await prisma.$disconnect()
    }) */