import mongoose from 'mongoose'


export default async function connectDB(){
    try {
        const connectionInstance = await mongoose.connect('mongodb+srv://pnkfun316:Pnk%40mgdb123@cluster0.japhwka.mongodb.net/paytm')

        console.log("Host: ",connectionInstance.connection.host);
    } catch (error) {
        console.log("Error while connecting to Mongo-DB: ", error);
    }
}