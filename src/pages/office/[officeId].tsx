import { ScrollBar, WebsiteList } from "@/components";
import type { Campus } from "@/components/DepartmentMenu";
import { DepartmentMenu } from "@/components/DepartmentMenu";
import { prisma } from "@/server/db";
import { NotFound, REVALIDATE_IN_SECONDS } from "@/services/global";
import type { Website } from "@prisma/client";
import { atom, useSetAtom } from "jotai";
import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import NYCULogo from "/public/NYCU_logo.png";

type CurrentState = {
  departmentId: string;
  officeId: string;
};

type OfficePageProps = {
  currentStates: CurrentState;
  menuInfo: Campus[];
  offices: { id: string; name: string }[];
  websites: Website[];
};

export const officeAtom = atom<string | null>(null);

const OfficePage: NextPage<OfficePageProps> = ({
  currentStates,
  menuInfo,
  offices,
  websites,
}) => {
  useSetAtom(officeAtom)(currentStates.officeId);
  return (
    <>
      <Head>
        <title>Web Archive</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="container mx-auto mt-12 font-serif">
        <section className="mb-10 flex items-center gap-4">
          <Image width={88} height={88} src={NYCULogo} alt="NYCU Logo" />
          <div>
            <h1 className="text-5xl font-black">國立陽明交通大學網站典藏庫</h1>
            <h2 className="px-4 pt-3 text-xl">
              National Yang Ming Chiao Tung University Web Archiving System
            </h2>
          </div>
        </section>
        <div className="flex max-w-full gap-3">
          <DepartmentMenu
            campuses={menuInfo}
            activeDepartmentId={currentStates.departmentId}
          />
          <div className="min-w-0">
            <ScrollBar offices={offices} activeId={currentStates.officeId} />
            <WebsiteList websites={websites} />
          </div>
          <div className="px-10"></div>
        </div>
      </main>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const officeList = await prisma.office.findMany();
    return {
      paths: officeList.map((office) => {
        return {
          params: { officeId: office.id },
        };
      }),
      fallback: "blocking",
    };
  } catch (error) {
    console.error(error);
    return {
      paths: [],
      fallback: true,
    };
  }
};

export const getStaticProps: GetStaticProps<OfficePageProps> = async (
  context
) => {
  const officeId = context.params?.officeId as string;

  const curDepartment = await prisma.office.findUnique({
    where: {
      id: officeId,
    },
    select: {
      departmentId: true,
    },
  });

  if (!curDepartment) {
    console.error("Department not found");
    return NotFound;
  }

  const menuInfos = await prisma.category.findMany({
    select: {
      name: true,
      department: {
        select: {
          id: true,
          name: true,
          office: {
            select: {
              id: true,
            },
            take: 1,
            orderBy: {
              id: "asc",
            },
          },
        },
      },
    },
  });

  const offices = await prisma.office.findMany({
    where: {
      departmentId: curDepartment.departmentId,
    },
    select: {
      id: true,
      name: true,
    },
    orderBy: {
      id: "asc",
    },
  });

  const websites = await prisma.office.findMany({
    where: {
      id: officeId,
    },
    select: {
      website: true,
    },
  });

  return {
    props: {
      currentStates: {
        departmentId: curDepartment.departmentId,
        officeId,
      },
      menuInfo: menuInfos.map((info) => ({
        campus: info.name,
        departments: info.department
          .filter((department) => department.office.length > 0)
          .map((department) => ({
            id: department.id,
            name: department.name,
            firstOfficeId: department.office[0]?.id || "",
          })),
      })),
      offices: offices,
      websites: websites[0]?.website || [],
    },
    revalidate: REVALIDATE_IN_SECONDS,
  };
};

export default OfficePage;
