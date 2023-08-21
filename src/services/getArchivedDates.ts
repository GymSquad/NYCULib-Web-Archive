import axios from "axios";
import { apiClient } from "./apiClient";

export const getArchivedDates = async (websiteId: string) => {
  return apiClient.get<string[]>(`/website/${websiteId}`);
};
