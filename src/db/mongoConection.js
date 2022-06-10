import * as mongoDB from "mongodb"
import variables from '../config/variables.config.js'


export async function connectToDatabase(){
    try {
        const client= new mongoDB.MongoClient(variables.DB_CONN_STRING);
        let client_conection= await client.connect();
        const db = client.db(variables.DB_NAME)
        return client_conection
    } catch (error) {
        console.error(error)
        throw error
    }
}


export async function setReserve(db,body){
    try{
        let result=await db.collection("reserva").insertOne( body );
        return result
    }catch(error){
        console.error(error)
        throw error
    }
}

export async function updateReserveState(db,nuevoEstado,id){
    try{
        let result=await db.collection("reserva").updateOne({id},
        {$set:{estado:nuevoEstado}});
        return result
    }catch(error){
        console.error(error)
        throw error
    }
}

export async function getReserve(db,id){
    
    try{
        const collection = db.collection("reserva");     
        let result=await collection.findOne({id});
        return result
    }catch(error){
        console.error(error)
        throw error
    }
}


