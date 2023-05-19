import { prisma } from "@/server/db";
import { NotFound } from "@/services/global";
import type { GetStaticPaths, GetStaticProps, NextPage } from "next";

const CategoryPage: NextPage = () => {
  return <>Loading...</>;
};

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const categories = await prisma.category.findMany({ select: { id: true } });
    return {
      paths: categories.map(({ id }) => ({
        params: { categoryId: id },
      })),
      fallback: true,
    };
  } catch (error) {
    console.error(error);
    return {
      paths: [],
      fallback: true,
    };
  }
};

export const getStaticProps: GetStaticProps = async (context) => {
  const categoryId = context.params?.categoryId as string;

  try {
    const department = await prisma.department.findFirst({
      where: { categoryId },
      select: { id: true },
    });
    if (!department) {
      return NotFound;
    }

    const office = await prisma.office.findFirst({
      where: { departmentId: department.id },
      select: { id: true },
    });

    if (!office) {
      return NotFound;
    }

    return {
      redirect: {
        statusCode: 301,
        destination: `/office/${office.id}`,
      },
    };
  } catch (error) {
    console.error(error);
    return NotFound;
  }
};

export default CategoryPage;
