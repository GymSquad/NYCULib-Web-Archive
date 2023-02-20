import { prisma } from "@/server/db";

export const getDepartmentInfo = async (categoryId: string) => {
  try {
    const result = await prisma.department.findMany({
      where: {
        categoryId,
      },
      select: {
        id: true,
        name: true,
        office: {
          select: {
            id: true,
          },
        },
      },
    });
    return result.map(({ office, name, id }) => ({
      id,
      urlId: office[0]?.id || null,
      name,
    }));
  } catch (error) {
    throw error;
  }
};
