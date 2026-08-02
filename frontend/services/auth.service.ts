import api from "@/lib/axios";

export const login = async (data: {
  email: string;
  password: string;
}) => {
  const res = await api.post("/auth/login", data);
  return res.data;
};

export const register = async (data: {
  name: string;
  email: string;
  password: string;
}) => {
  const res = await api.post("/auth/register", data);
  return res.data;
};

export const logout = async () => {
  await api.post("/auth/logout");
};

export const getMe = async () => {
  const response = await api.get("/auth/me");
  return response.data.user;
};