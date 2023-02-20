import { prisma } from "@/server/db";
export const getDepartmentId = async (officeId: string) => {
  try {
    const result = await prisma.office.findUnique({
      where: {
        id: officeId,
      },
      select: {
        departmentId: true,
      },
    });

    if (result == null) {
      throw Error("Invalid officeId");
    }

    return result.departmentId;
  } catch (error) {
    throw error;
  }
};
