import { type Website } from "@prisma/client";

export type CardProps = Omit<Website, "officeId" | "updatedAt"> & {
  updatedAt: string;
};

export type PageProps = {
  websites: CardProps[];
  offices: { id: string; name: string }[];
  departments: { id: string; name: string; urlId: string | null }[];
  categories: { id: string; name: string; urlId: string | null }[];
  officeId: string;
  departmentId: string;
  categoryId: string;
};
