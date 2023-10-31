import { ArchivedTimeline } from "@/components/ArchivedTimeline";
import { prisma } from "@/server/db";
import { NotFound, REVALIDATE_IN_SECONDS } from "@/services/global";
import { readdir } from "fs/promises";
import { useAtomValue } from "jotai";
import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import path from "path";
import { useEffect } from "react";
import { officeAtom } from "../../office/[officeId]";
import NYCULogo from "/public/NYCU_logo.png";

type Props = {
  websiteId: string;
  selectedDate: string | null;
  dates: string[];
};

const Website: NextPage<Props> = ({ websiteId, selectedDate, dates }) => {
  const router = useRouter();

  useEffect(() => {
    if (selectedDate == null) {
      router.replace(`/website/${websiteId}/${dates[0]}`);
    }
  }, [dates, router, selectedDate, websiteId]);

  if (dates.length == 0) {
    return <NoArchive />;
  }

  const frameUrl = `http://webarchive.lib.nycu.edu.tw/archive/${websiteId}`;
  const times = dates.map((date) => ({
    date,
    href: `/website/${websiteId}/${date}`,
  }));

  return (
    <WebsiteArchive
      times={times}
      frameUrl={frameUrl}
      activeDate={selectedDate ?? dates[0] ?? ""}
    />
  );
};

export default Website;

export const getStaticPaths: GetStaticPaths<UrlQuery> = async () => {
  const websites = await prisma.website.findMany({
    select: { id: true },
  });

  const promiseResults = await Promise.allSettled(
    websites.map(async ({ id: websiteId }) => {
      const dates = await readArchivedDates(websiteId);
      const datesWithUndefined = [...dates, undefined];
      return datesWithUndefined.map((date) => ({
        params: {
          websiteId,
          date: date ? [date] : [],
        },
      }));
    })
  );

  const paths = promiseResults.filter(isFulfilled).flatMap((result) => {
    return result.value;
  });
  return {
    paths,
    fallback: "blocking",
  };
};

const isFulfilled = <T,>(
  result: PromiseSettledResult<T>
): result is PromiseFulfilledResult<T> => {
  return result.status === "fulfilled";
};

type UrlQuery = {
  websiteId: string;
  date: string[];
};

export const getStaticProps: GetStaticProps<Props, UrlQuery> = async (
  context
) => {
  if (!context.params) {
    return NotFound;
  }

  const { websiteId, date } = context.params;

  const dates = await readArchivedDates(websiteId);

  return {
    props: {
      websiteId,
      selectedDate: date?.[0] ?? null,
      dates,
    },
    revalidate: REVALIDATE_IN_SECONDS,
  };
};

const readArchivedDates = async (websiteId: string) => {
  try {
    return await readdir(path.join("/mnt/webarchive/new-archive", websiteId));
  } catch (error) {
    return [];
  }
};

type WebsiteArchiveProps = {
  times: {
    date: string;
    href: string;
  }[];
  activeDate: string;
  frameUrl: string;
};

const WebsiteArchive: React.FC<WebsiteArchiveProps> = ({
  times,
  activeDate,
  frameUrl,
}) => {
  const history = useAtomValue(officeAtom);
  return (
    <>
      <Head>
        <title>Web Archive</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="container mx-auto flex h-screen flex-col pt-10 font-serif">
        <div>
          {/* FIXME: link */}
          <section className="mb-6 flex items-center gap-2">
            <Image src={NYCULogo} alt="NYCU Logo" width={48} height={48} />
            <Link className="" href={history ? `/office/${history}` : "/"}>
              <h1 className="text-2xl font-black">
                國立陽明交通大學網站典藏庫
              </h1>
              <h2 className="text-md">
                National Yang Ming Chiao Tung University Web Archiving System
              </h2>
            </Link>
          </section>
        </div>

        <section className="flex w-full flex-col justify-center px-8 pb-6">
          <ArchivedTimeline times={times} activeDate={activeDate} />
        </section>

        <section className="flex w-full flex-auto px-8 pb-4">
          <iframe
            className="h-full w-full flex-auto rounded-md"
            src={`${frameUrl}/${activeDate}`}
          />
        </section>
      </main>
    </>
  );
};

const NoArchive: React.FC = () => {
  const history = useAtomValue(officeAtom);
  return (
    <>
      <Head>
        <title>Web Archive</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="container mx-auto flex h-screen flex-col pt-10 font-serif">
        <div>
          {/* FIXME: link */}
          <section className="mb-6 flex items-center gap-2">
            <Image src={NYCULogo} alt="NYCU Logo" width={48} height={48} />
            <Link className="" href={history ? `/office/${history}` : "/"}>
              <h1 className="text-2xl font-black">
                國立陽明交通大學網站典藏庫
              </h1>
              <h2 className="text-md">
                National Yang Ming Chiao Tung University Web Archiving System
              </h2>
            </Link>
          </section>
        </div>
        <section className="flex w-full flex-col justify-center px-8 pb-6">
          <h2>This page have not been archive yet!</h2>
        </section>
      </main>
    </>
  );
};