import {Request, Response, } from 'express'
import { Author } from '../model/index'



export class logoutMiddleware{

    logoutAuthor = async(req:Request,res:Response):Promise<void>=>{
        try{
            let {id} = req.params
            await Author.findByIdAndUpdate(id,{
                $set:{token:''}
            })
            res.json({message:"Logged out succesfully"})
        }catch(err){
            res.json({message:'Error in loggin out'})
        }
    }
}