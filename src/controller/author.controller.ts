import { Request, Response } from "express";
import {ErrorClass} from '../helper/errorHelper'
import { AuthorService, PostAuthorResult, UpdateAuthorResult } from "../service/author.service";

let authorService = new AuthorService()
let errorObj = new ErrorClass()

export class AuthorController{
    getAllAuthor= async (req: Request, res: Response) => {
        try {
          const books = await authorService.getAllAuthor();
          res.status(200).send({ message: "All books fetched", books });
        } catch (error) {
          const message: string = errorObj.errorHelper(error);
          res.status(500).json({ message });
        }
      };

    deleteAll = async (req: Request, res: Response) => {
        try {
          await authorService.deleteAllAuthors();
          res.status(200).json({ message: 'All authors deleted' });
        } catch (error) {
          const message: string = errorObj.errorHelper(error);
          res.json({ message });
        }
      };

    postAuthor = async (req: Request, res: Response): Promise<void> => {
        try {
          const { message, author }: PostAuthorResult = await authorService.postAuthor(req.body);
          res.status(200).json({ message, author });
        } catch (error) {
          console.error("Error:", error);
          const message: string = errorObj.errorHelper(error);
          res.json({ message });
        }
      };

    deleteAuthor = async (req: Request, res: Response) => {
        try {
          const authorId = req.params.id;
          await authorService.deleteAuthorById(authorId);
          res.status(200).json({ message: 'Author deleted' });
        } catch (error) {
          const message: string = errorObj.errorHelper(error);
          res.json({ message });
        }
      };

      updateAuthor = async (req: Request, res: Response) => {
        try {
          const { id } = req.params;
          const updateData = req.body;
      
          const updateResult: UpdateAuthorResult = await authorService.updateAuthor(id, updateData);
          if (!updateResult.success) {
            return res.status(404).json({ message: updateResult.message });
          }
          res.status(200).json({ message: updateResult.message, updatedAuthor: updateResult.updatedAuthor });
        } catch (error) {
          const message: string = errorObj.errorHelper(error);
          res.status(500).json({ message });
        }
      };
      

    getAuthorById = async (req: Request, res: Response) => {
        try {
          const { id } = req.params;
          const author = await authorService.getAuthorById(id);
          if (!author) {
            return res.status(404).json({ message: 'Author not found' });
          }
          res.status(200).json({ message: 'Author found', author });
        } catch (error) {
          const message: string = errorObj.errorHelper(error);
          res.status(500).json({ error: message });
        }
      };
}