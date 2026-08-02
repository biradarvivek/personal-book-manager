import api from "@/lib/axios";

export const getBooks = async () => {
  const response = await api.get("/books");
  return response.data.books;
};

export const getBook = async (id: string) => {
  const response = await api.get(`/books/${id}`);
  return response.data.book;
};

export const createBook = async (data: any) => {
  const response = await api.post("/books", data);
  return response.data;
};

export const updateBook = async (
  id: string,
  data: any
) => {
  const response = await api.put(`/books/${id}`, data);
  return response.data;
};

export const deleteBook = async (id: string) => {
  const response = await api.delete(`/books/${id}`);
  return response.data;
};

export const toggleFavorite = async (id: string) => {
  const response = await api.patch(`/books/${id}/favorite`);
  return response.data;
};