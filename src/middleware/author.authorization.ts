import { Request, Response, NextFunction } from 'express';
import { Books } from '../model/index';

export const isBookAuthor = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id,bookId  } = req.params;

    const book = await Books.findById(bookId);

    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    if (book.author.toString() !== id) {
      return res.status(403).json({ message: 'You are not authorized to update this book' });
    }
    next();
  } catch (error) {
    
    console.error('Error checking book author:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
