import mongoose from "mongoose"

export async function connect(){
  try {
    // In this typeScript wants type Safety that if urls is undefined then ts gives error 
    // so we have to check if its defined or not ,so to overcome that problem we just add exclamtion mark at the end of Url 
    // mongoose.connect(process.env.MONGO_URL!)
    const MONGO_URL=process.env.MONGO_URL
    if (!MONGO_URL) {
      throw new Error("MONGO_URL is not defined in environment variables");
    }
     await mongoose.connect(MONGO_URL)
    const connection=mongoose.connection
    connection.on('connected',()=>{
      console.log("MongoDb Connected Successfully")
    })
    connection.on('error',()=>{
      console.log("Error in connecting with database")
      process.exit()
    })
  } catch (error) {
      console.log("Something went wrong in connecting with DataBase")
      console.log(error);
  }
}

export default connect