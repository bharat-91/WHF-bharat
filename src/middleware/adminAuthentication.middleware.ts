import { Request, Response, NextFunction } from 'express';

export const authenticateAdmin = (req: Request, res: Response, next: NextFunction) => {
  const { adminName, adminPassword } = req.body;
  
  if (adminName === 'Bharat' && adminPassword === 'Bharat@123') {
    next();
  } else {
    res.status(401).json({ message: 'Admin Only Access' });
  }
};
