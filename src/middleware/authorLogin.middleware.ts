import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt';
import { Request, Response, NextFunction } from 'express'
import { Author } from "../model/index";

export class LoginMiddleware {
     authorLogin = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                return res.status(400).json({ message: "Email and Password are compulsory for login" });
            }

            const user = await Author.findOne({ email });

            if (!user) {
                return res.status(404).json({ message: "User not found. Please register before logging in." });
            }

            const isPasswordValid = await bcrypt.compare(password, user.password);

            if (!isPasswordValid) {
                return res.status(401).json({ message: "Invalid email or password" });
            }

            req.body = user; // Attach user object to request for further processing
            next();
        } catch (error) {
            console.error("Error during login:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    };

    isLoggedIn = async (req: Request, res: Response, next: NextFunction) => {
        try {
          const { id } = req.params;
          const author = await Author.findOne({ _id: id, token: { $exists: true, $ne: '' } });
      
          if (!author) {
            return res.status(401).json({ message: 'Author not logged in' });
          }
      
        //   req.author = author; // Attach author object to request for further processing
          next();
        } catch (error) {
          console.error('Error during isLoggedIn middleware:', error);
          res.status(500).json({ message: 'Internal server error' });
        }
      };

     loginUser = async (req: Request, res: Response) => {
        try {
            const { _id } = req.body;
            const token = jwt.sign({ userId: _id }, "your_secret_key", { expiresIn: "1h" });

            await Author.findByIdAndUpdate(_id, { token });

            res.status(200).json({ message: "Login successful", token });
        } catch (error) {
            console.error("Error during loginUser:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    };
}
