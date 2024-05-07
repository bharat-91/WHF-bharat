import { Request, Response } from "express";
import {Author} from '../model/index'
import bcrypt from 'bcrypt'
import { Document } from "mongoose";
import { IAuthor } from "../interface";


export interface PostAuthorResult {
  message: string;
  author: any; 
}

export interface UpdateAuthorResult {
  success: boolean;
  message: string;
  updatedAuthor?: Document<any, any>;
}


export class AuthorService{
    getAllAuthor = async (): Promise<Document<any, any>[]> => {
      try {
        const books = await Author.find();
        return books;
      } catch (error) {
        throw error; 
      }
    };

    getAuthorById = async (id: string): Promise<IAuthor | null> => {
      try {
        const author = await Author.findById(id);
        return author;
      } catch (error) {
        throw error; 
      }
    };

    deleteAllAuthors = async (): Promise<void> => {
      await Author.deleteMany();
      return;
    };

    updateAuthor = async (id: string, updateData: any): Promise<UpdateAuthorResult> => {
      try {
        const updatedAuthor = await Author.findByIdAndUpdate(id, updateData, { new: true });
        if (!updatedAuthor) {
          return { success: false, message: 'Author not found' };
        }
        return { success: true, message: 'Author updated successfully', updatedAuthor };
      } catch (error) {
        throw error; // Propagate the error to the caller
      }
    };
    deleteAuthorById = async (authorId: string): Promise<void> => {
      await Author.findByIdAndDelete(authorId);
      return;
    };

      postAuthor = async (authorData: any): Promise<PostAuthorResult> => {
        try {
          let password = authorData.password;
          const salt = await bcrypt.genSalt(10);
          const hash = await bcrypt.hash(password, salt);
          authorData.password = hash;
      
          const author = await Author.create(authorData);
          return {
            message: "Author Created Successfully",
            author: author
          };
        } catch (error) {
          throw error;
        }
      };
}