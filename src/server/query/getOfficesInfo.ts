import { prisma } from "@/server/db";

export const getOfficesInfo = async (departmentId: string) => {
  try {
    const result = await prisma.department.findUnique({
      where: {
        id: departmentId,
      },
      select: {
        office: {
          select: {
            name: true,
            id: true,
          },
        },
      },
    });

    if (!result) {
      throw Error("Invalid departmentId");
    }

    return result.office;
  } catch (error) {
    throw error;
  }
};
