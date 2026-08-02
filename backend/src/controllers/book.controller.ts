import { Request, Response } from "express";
import Book from "../models/Book";

export const createBook = async (req: Request, res: Response) => {
  try {
    const book = await Book.create({
      ...req.body,
      user: req.userId,
    });

    return res.status(201).json({
      success: true,
      message: "Book added successfully",
      book,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const getBooks = async (req: Request, res: Response) => {
  try {
    const books = await Book.find({
      user: req.userId,
    }).sort({
      createdAt: -1,
    });

    return res.json({
      success: true,
      books,
    });
  } catch {
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const getBook = async (req: Request, res: Response) => {
  try {
    const book = await Book.findOne({
      _id: req.params.id,
      user: req.userId,
    });

    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }

    return res.json({
      success: true,
      book,
    });
  } catch {
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const updateBook = async (req: Request, res: Response) => {
  try {
    const book = await Book.findOneAndUpdate(
      {
        _id: req.params.id,
        user: req.userId,
      },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    

    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }

    if (book.progress === 0) {
      book.status = "Want to Read";
    } else if (book.progress === 100) {
      book.status = "Completed";
    } else {
      book.status = "Reading";
    }

    await book.save();

    return res.json({
      success: true,
      message: "Book updated successfully",
      book,
    });
  } catch {
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const deleteBook = async (req: Request, res: Response) => {
  try {
    const book = await Book.findOneAndDelete({
      _id: req.params.id,
      user: req.userId,
    });

    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }

    return res.json({
      success: true,
      message: "Book deleted successfully",
    });
  } catch {
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const toggleFavorite = async (req: Request, res: Response) => {
  try {
    const book = await Book.findOne({
      _id: req.params.id,
      user: req.userId,
    });

    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }

    book.favorite = !book.favorite;

    await book.save();

    return res.json({
      success: true,
      message: "Favorite updated",
      book,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};