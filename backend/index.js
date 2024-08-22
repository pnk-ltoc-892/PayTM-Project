
import connectDB from "./db/index.js";

import { app } from './app.js';


connectDB().then( () => {
    app.listen( 3000, () => {
        console.log('Server Started Listening On PORT: ', 3000);
        
    } )
    }   
).catch( (err) => {console.log("MongoDB connection failed, Error: ", err)})



