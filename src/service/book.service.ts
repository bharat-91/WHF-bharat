import { Books } from "../model/index";
import { IBooks, PaginationResult } from "../interface/index";
import { Document, FilterQuery } from "mongoose";

export class BookService{
   
    getAllBooks = async (): Promise<Document<any, any>[]> => {
        try {
          const books = await Books.find();
          return books;
        } catch (error) {
          throw error; 
        }
      };

    postBook = async (bookData: IBooks): Promise<Document<any, any> | null> => {
        try {
          const book = await Books.create(bookData);
          return book;
        } catch (error) {
          throw error; 
        }
      };
 
    deleteBook = async (id: string): Promise<IBooks | null> => {
        try {
          const book: IBooks | null = await Books.findByIdAndDelete(id);
          return book;
        } catch (error) {
          throw error;
        }
      };

    updateBook = async (bookId: string, bookData: Partial<IBooks>): Promise<IBooks | null> => {
        try {
          const updatedBooks = await Books.findByIdAndUpdate(bookId, bookData, { new: true });
          return updatedBooks;
        } catch (error) {
          throw error;
        }
      };

    getBooksPagination = async (page: number = 1, limit: number = 10): Promise<PaginationResult> => {
        try {
          const offset = (page - 1) * limit;
      
          const books = await Books.find()
            .skip(offset)
            .limit(limit)
            .exec();
      
          const totalBooks = await Books.countDocuments();
          const totalPage = Math.ceil(totalBooks / limit);
      
          return {
            currentPage: page,
            totalPage: totalPage,
            totalBooks: totalBooks,
            books: books
          };
        } catch (error) {
          throw error; // Propagate the error to the caller
        }
      };

    getFilteredBooksByGenre = async (genre: string | undefined): Promise<any[]> => {
        let query: FilterQuery<any> = {};

        if (genre) {
          query = { genre: genre };
        }
    
        const books = await Books.find(query).exec();
        return books;
    }
}