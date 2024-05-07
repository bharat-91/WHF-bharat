import mongoose, { Document } from "mongoose"
import Genre from "../enum/books.genre";

export interface IBooks extends Document {
    name: string;
    description: string;
    rating: number;
    genre: Genre[];
    author: mongoose.Types.ObjectId;
    authorName: string;
    price: number;
    token: string,
  }