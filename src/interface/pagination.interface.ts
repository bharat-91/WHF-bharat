import { Document } from "mongoose";

export default interface PaginationResult {
    currentPage: number;
    totalPage: number;
    totalBooks: number;
    books: Document<any, any>[];
  }