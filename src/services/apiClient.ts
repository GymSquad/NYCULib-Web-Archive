import { env } from "@/env/server.mjs";
import axios from "axios";

const baseURL = env.API_URL;

export const apiClient = axios.create({
  baseURL: baseURL,
});
