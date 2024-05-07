import express,{ Router } from "express";
import { BookController } from "../controller/books.controller";
import { isAuthorLoggedIn, isBookAuthorOrAdmin } from "../middleware/bookAuthorOrAdmin.middleware";

const bookRouter:Router = express.Router()
let bookController = new BookController()

bookRouter.get('/getAllBooks',bookController.getAllBooks)
bookRouter.post('/postBook',isBookAuthorOrAdmin,isAuthorLoggedIn,bookController.postBooks)
bookRouter.delete('/deleteBook/:id',isBookAuthorOrAdmin,isAuthorLoggedIn, bookController.deleteBook)
bookRouter.put('/updateBook/:bookId',isAuthorLoggedIn,isBookAuthorOrAdmin, bookController.updateMovie)
bookRouter.get('/paginatedBooks', bookController.paginationPageGetBooks)
bookRouter.get('/getGenreBooks',bookController.filteredBooksByGenre)

export default bookRouter