import mongoose,{Schema} from "mongoose";
import Genre from "../../enum/books.genre";
import { IBooks } from "../../interface/index";


const bookSchema: Schema<IBooks> = new Schema({
    name: { type: String, required: true, trim: true }, 
    description: { type: String, required: true },
    rating: { type: Number, default: 0, min: 0, max: 5 }, 
    genre: [{ type: String, enum: Object.values(Genre), required: true }],
    author: { type: Schema.Types.ObjectId, ref: 'Author', required: true },
    authorName: { type: String, required: true },
    price: { type: Number, required: true, min: 0 } 
  });

  export const Books =  mongoose.model<IBooks>('Book', bookSchema);