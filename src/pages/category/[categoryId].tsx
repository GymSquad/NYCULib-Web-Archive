import { prisma } from "@/server/db";
import { NotFound, REVALIDATE_IN_SECONDS } from "@/services/global";
import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";

const CategoryPage: NextPage<PageProps> = ({ firstOfficeId }) => {
  const router = useRouter();
  useEffect(() => {
    router.replace(`/office/${firstOfficeId}`);
  }, [firstOfficeId, router]);
  return <></>;
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

type PageProps = {
  firstOfficeId: string;
};

type UrlQuery = {
  categoryId: string;
};

export const getStaticProps: GetStaticProps<PageProps, UrlQuery> = async (
  context
) => {
  if (context.params == null) {
    return NotFound;
  }

  const categoryId = context.params.categoryId;

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
      orderBy: { id: "asc" },
    });

    if (!office) {
      return NotFound;
    }

    return {
      props: {
        firstOfficeId: office.id,
      },
      revalidate: REVALIDATE_IN_SECONDS,
    };
  } catch (error) {
    console.error(error);
    return NotFound;
  }
};

export default CategoryPage;
