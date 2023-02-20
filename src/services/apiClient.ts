import axios from "axios";

const baseURL = "/api";

export const apiClient = axios.create({
  baseURL: baseURL,
});
