import mongoose from "mongoose"
const dbConnection= async ()=>{
    try{
        const connection = await mongoose.connect(process.env.MONGODB_URL,{dbName:'Unhinged'})
        console.log("DB Connected")

    }catch(e){
        console.log("error occured in db connection" + e)

    }
}

export default dbConnection