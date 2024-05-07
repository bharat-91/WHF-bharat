import { ConnectDataBase } from "./db/dbconfig";
import express,{Response,Request,Express} from 'express'
import {bookRouter, authorRouter} from "./routes";

// import {  movieRouter,userRouter, profileRoutes, watchLaterRoute } from "./Routes";
// import  movieRouter  from "./Routes/movies.routes";


const app = express()

app.use(express.json())

ConnectDataBase()
app.listen(process.env.PORT_NUMBER||6000, () => {
    console.log(`Server is running on http://localhost:${process.env.PORT_NUMBER||6000}`);
})

app.get('/',(req:Request, res:Response) =>{
    res.send("Welcome welcome welcome dosto")
})

app.use('/books',bookRouter)
app.use('/author',authorRouter)
// app.use('/user',userRouter)
// app.use('/profile',profileRoutes)
// app.use('/watchLater',watchLaterRoute)