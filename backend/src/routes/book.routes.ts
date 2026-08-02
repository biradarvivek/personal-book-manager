import { Router } from "express";

import {
  createBook,
  deleteBook,
  getBook,
  getBooks,
  toggleFavorite,
  updateBook,
} from "../controllers/book.controller";

import protect from "../middlewares/auth.middleware";

const router = Router();

router.use(protect);

router.route("/")
  .get(getBooks)
  .post(createBook);

router.route("/:id")
  .get(getBook)
  .put(updateBook)
  .delete(deleteBook);

router.patch("/:id/favorite", protect, toggleFavorite);

export default router;