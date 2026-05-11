import axios from "axios";

const API = axios.create({
  // baseURL: "http://localhost:3000"
  baseURL : "https://blog-project-backend-7jm6.onrender.com"
});

export const getUsers = () => API.get("/users");
export const createUser = (data) => API.post("/users", data);
export const getBlogs = () => API.get("/blogs");
export const getBlogById = (id) => API.get(`/blogs/${id}`);
export const createBlog = (data) => API.post("/blogs", data);
export const updateBlog = (id, data) => API.put(`/blogs/${id}`, data);
export const deleteBlog = (id) => API.delete(`/blogs/${id}`);