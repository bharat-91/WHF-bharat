import mongoose from "mongoose";
export const ConnectDataBase = () =>{
    mongoose.connect("mongodb+srv://bharatshaligram:Ln0f5phRX0McZvvD@bookify.fr8fclm.mongodb.net/?retryWrites=true&w=majority&appName=BookiFy").then(()=>{
        console.log("Successfull Connection");
    }).catch((error)=>{
        console.log("Connection Failed");
        console.log(error);
    })
}