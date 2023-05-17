import { prisma } from "@/server/db";

export const getWebsiteInfo = async (officeId: string) => {
  try {
    const result = await prisma.website.findMany({
      where: {
        office: {
          some: {
            id: officeId,
          },
        },
      },
      select: {
        id: true,
        name: true,
        url: true,
        isUrlValid: true,
      },
    });
    return result;
  } catch (error) {
    throw error;
  }
};
