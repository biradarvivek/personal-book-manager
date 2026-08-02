import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes";
import bookRoutes from "./routes/book.routes";

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());



app.get("/", (_req, res) => {
  res.json({
    success: true,
    message: "Book Manager API is running ",
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/books", bookRoutes);

export default app;