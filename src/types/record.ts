import { type Record } from "@prisma/client";
import { z } from "zod";

export const createRecordSchema = z.object({
  office: z.string().min(1, "This field can't be left empty"),
  url: z.string().url(),
});

export type CreateRecord = z.infer<typeof createRecordSchema>;

export type ApiRecord = Omit<Record, "updatedAt"> & { updatedAt: string };
