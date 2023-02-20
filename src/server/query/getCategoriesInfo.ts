import { prisma } from "@/server/db";
export const getCategoryInfo = async () => {
  try {
    const result = await prisma.category.findMany({
      select: {
        id: true,
        name: true,
        department: {
          select: {
            office: {
              select: {
                id: true,
              },
            },
          },
        },
      },
    });
    return result.map((r) => ({
      id: r.id,
      name: r.name,
      urlId: r.department[0]?.office[0]?.id || null,
    }));
  } catch (error) {
    throw error;
  }
};
