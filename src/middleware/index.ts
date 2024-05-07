import { authenticateAdmin } from "./adminAuthentication.middleware";
import { isBookAuthor } from "./author.authorization";
import { isBookAuthorOrAdmin } from "./bookAuthorOrAdmin.middleware";

export {authenticateAdmin, isBookAuthor, isBookAuthorOrAdmin}