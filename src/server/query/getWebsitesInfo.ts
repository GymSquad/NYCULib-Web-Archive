import { prisma } from "@/server/db";

export const getWebsiteInfo = async (officeId: string) => {
  try {
    const result = await prisma.website.findMany({
      where: {
        officeId,
      },
      select: {
        id: true,
        name: true,
        url: true,
        updatedAt: true,
        viewCount: true,
      },
    });
    return result;
  } catch (error) {
    throw error;
  }
};
