import { type Website } from "@prisma/client";

export type CardProps = Omit<Website, "id" | "officeId" | "updatedAt"> & {
  updatedAt: string;
};
