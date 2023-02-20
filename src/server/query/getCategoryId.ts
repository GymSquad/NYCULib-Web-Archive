import { prisma } from "@/server/db";
export const getCategoryId = async (officeId: string) => {
  try {
    const result = await prisma.office.findUnique({
      where: {
        id: officeId,
      },
      select: {
        department: {
          select: {
            categoryId: true,
          },
        },
      },
    });

    if (result == null) {
      throw Error("Invalid officeId");
    }

    return result.department.categoryId;
  } catch (error) {
    throw error;
  }
};
