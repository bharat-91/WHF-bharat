import mongoose, { Schema } from "mongoose";
import { IAuthor } from "../../interface/index";

const authorSchema: Schema<IAuthor> = new Schema({
    name: { type: String, required: true, trim: true },
    dob: { type: Date, required: true },
    averageRatings: { type: Number, default: 0, min: 0, max: 5 },
    birthplace: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true, match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
    token:{type:String, default:''},
    password: { type: String, required: true, minlength: 6 },

  },{
    timestamps:true
  });

  export const Author =  mongoose.model<IAuthor>('Author', authorSchema);