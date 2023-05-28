import { type Website } from "@prisma/client";

export type CardProps = Omit<Website, "officeId">;
