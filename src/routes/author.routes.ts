import express,{ Router } from "express";
import { AuthorController } from "../controller/author.controller";
import { LoginMiddleware } from "../middleware/authorLogin.middleware";
import { logoutMiddleware } from "../middleware/authorLogout.middleware";
import { authenticateAdmin } from "../middleware/adminAuthentication.middleware";

let authorRouter:Router = express.Router()
let authorController = new AuthorController()
let loginMiddleware = new LoginMiddleware()
let logout = new logoutMiddleware()

authorRouter.get('/getAllAuthor',authenticateAdmin, authorController.getAllAuthor)
authorRouter.post('/postAuthor',authorController.postAuthor)
authorRouter.get('/getAuthorById/:id', authorController.getAuthorById)
authorRouter.put('/updateAuthor/:id', authorController.updateAuthor)
authorRouter.delete('/deleteAuthor/:id', authorController.deleteAuthor)
authorRouter.delete('/deleteAll',authenticateAdmin,authorController.deleteAll)
authorRouter.post('/login', loginMiddleware.authorLogin, loginMiddleware.loginUser)
authorRouter.post('/logout/:id',loginMiddleware.isLoggedIn, logout.logoutAuthor)

export default authorRouter