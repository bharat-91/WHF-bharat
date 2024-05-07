import { Request, Response, NextFunction } from 'express';
import { Books, Author } from '../model/index';

export const isBookAuthorOrAdmin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { authorId, adminName, adminPassword } = req.body;

    if (!authorId && (!adminName || !adminPassword)) {
      return res.status(400).json({ message: 'Either authorId or adminName and adminPassword are required' });
    }

    const book = await Books.findById(id);

    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    if (adminName === 'Bharat' && adminPassword === 'Bharat@123') {
      return next();
    }

    const bookAuthorId = book.author.toString();

    if (bookAuthorId !== authorId) {
      return res.status(403).json({ message: 'You are not authorized to update this book' });
    }

    next(); 
  } catch (error) {
    console.error('Error checking book author or admin:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const isAuthorLoggedIn = async(req:Request, res:Response, next:NextFunction) =>{
  try {
    const { authorId, adminName } = req.body;

    // If adminName is provided, skipping author login check
    if (adminName) {
      return next();
    }

    const author = await Author.findOne({ _id: authorId, token: { $exists: true, $ne: '' } });
    
    if (!author) {
      return res.status(401).json({ message: 'Author not logged in' });
    }
    next();
  } catch (error) {
    console.error('Error during isLoggedIn middleware:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
