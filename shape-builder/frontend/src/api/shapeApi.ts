import axios from "axios";
import { Shape } from "../types/Shape";

const api = axios.create({
  baseURL: "http://localhost:8080/api",
});

export const getShapes = () => api.get<Shape[]>("/shapes");

export const getShape = (id: number) =>
  api.get<Shape>(`/shapes/${id}`);

export const createShape = (shape: Shape) =>
  api.post("/shapes", shape);

export const updateShape = (id: number, shape: Shape) =>
  api.put(`/shapes/${id}`, shape);

export const deleteShape = (id: number) =>
  api.delete(`/shapes/${id}`);

export default api;