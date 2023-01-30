import { type ApiRecord, type CreateRecord } from "@/types/record";
import { apiClient } from "./apiClient";

export const getRecords = async () => {
  const res = await apiClient.get<ApiRecord[]>("/records");
  return res.data;
};

export const addRecord = async (data: CreateRecord) => {
  const res = await apiClient.post<ApiRecord>("/records", data);
  return res.data;
};
