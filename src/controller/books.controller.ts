import { ErrorClass } from "../helper/errorHelper";
import { Request, Response } from "express";
import { BookService } from "../service/book.service";
import PaginationResult from "../interface/pagination.interface";

let bookService = new BookService()
let errorObj = new ErrorClass()

export class BookController{
    getAllBooks = async (req: Request, res: Response) => {
        try {
          const books = await bookService.getAllBooks();
          res.status(200).send({ message: "All books fetched", books });
        } catch (error) {
          const message: string = errorObj.errorHelper(error);
          res.status(500).json({ message });
        }
      };

    postBooks = async (req: Request, res: Response) => {
        try {
          const bookData = req.body;
          const book = await bookService.postBook(bookData);
          res.status(200).json({ message: 'Book Added Successfully', book });
        } catch (error) {
          const message: string = errorObj.errorHelper(error);
          res.status(500).json({ message });
        }
      };

    deleteBook = async (req: Request, res: Response) => {
        try {
          const { id } = req.params;
          const deletedBook = await bookService.deleteBook(id);
          if (deletedBook) {
            res.json({ message: "Data Deleted Successfully", deletedBook });
          } else {
            res.json({ message: "Check the ID Again" });
          }
        } catch (error) {
          const message: string = errorObj.errorHelper(error);
          res.json({ message });
        }
      };

    updateMovie = async (req: Request, res: Response) => {
        try {
          const { bookId } = req.params;
          const updatedBooks = await bookService.updateBook(bookId, req.body);
          res.status(200).json({ message: "Books Updated", updatedBooks });
        } catch (error) {
          const message: string = errorObj.errorHelper(error);
          res.json({ message });
        }
      };
    
    paginationPageGetBooks = async (req: Request, res: Response) => {
        try {
          const { page, limit } = req.query;
          const pageNumber = parseInt(page as string) || 1;
          const limitNumber = parseInt(limit as string) || 10;
      
          const paginationResult: PaginationResult = await bookService.getBooksPagination(pageNumber, limitNumber);
          res.json(paginationResult);
        } catch (error) {
          const message: string = errorObj.errorHelper(error);
          res.status(500).json({ message });
        }
      };

    filteredBooksByGenre = async(req:Request, res:Response) =>{
        try{
            const { genre } = req.query;
            const books = await bookService.getFilteredBooksByGenre(genre as string);
            res.json({ books });

        }catch(error){
            let message:string = errorObj.errorHelper(error)
            res.json({message})
        }
    }
}