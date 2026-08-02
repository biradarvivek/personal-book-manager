import mongoose, { Schema, Document } from "mongoose";

export interface IBook extends Document {
  title: string;
  author: string;
  description: string;
  genre: string;
  tags: string[];
  rating: number;
  status: string;
  progress: number;
  estimatedReadingTime: number;
  favorite: boolean;
  notes: string;
  user: mongoose.Types.ObjectId;
}

const bookSchema = new Schema<IBook>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    author: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      default: "",
    },

    genre: {
      type: String,
      default: "",
    },

    tags: [
      {
        type: String,
      },
    ],

    rating: {
      type: Number,
      default: 0,
    },

    status: {
      type: String,
      enum: ["Want to Read", "Reading", "Completed"],
      default: "Want to Read",
    },

    progress: {
      type: Number,
      default: 0,
    },

    estimatedReadingTime: {
      type: Number,
      default: 0,
    },

    favorite: {
      type: Boolean,
      default: false,
    },

    notes: {
      type: String,
      default: "",
    },

    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IBook>("Book", bookSchema);