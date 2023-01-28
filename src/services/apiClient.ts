import axios from "axios";

const baseURL = "http://localhost:3000/api";

export const apiClient = axios.create({
  baseURL: baseURL,
});
