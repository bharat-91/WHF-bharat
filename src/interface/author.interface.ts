import {Document} from "mongoose";
export interface IAuthor extends Document {
    name: string;
    dob: Date;
    averageRatings: number;
    birthplace: string;
    email: string;
    password: string;
    token: string;
  }