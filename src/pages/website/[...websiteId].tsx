import { NotFound } from "@/services/global";
import { readdir } from "fs/promises";
import { GetStaticProps, NextPage } from "next";
import path from "path";
import { z } from "zod";

type Props = {
  websiteId: string;
  selectedDate?: string;
  dates: string[];
};

const Website: NextPage<Props> = ({ websiteId, selectedDate, dates }) => {
  if (!dates) {
    return <div>loading...</div>;
  }

  const frameUrl = `http://webarchive.lib.nycu.edu.tw:8080/archive/${websiteId}`;

  if (!selectedDate) {
    return (
      <>
        <div className="flex gap-2">
          {dates.map((date) => (
            <a href={`/website/${websiteId}/${date}`} key={date}>
              {date}
            </a>
          ))}
        </div>
        <iframe
          className="h-screen w-full"
          src={`${frameUrl}/${dates.at(0)}`}
        ></iframe>
      </>
    );
  }

  return (
    <>
      <div className="flex gap-2">
        {dates.map((date) => (
          <a href={`/website/${websiteId}/${date}`} key={date}>
            {date}
          </a>
        ))}
      </div>
      <iframe
        className="h-screen w-full"
        src={`${frameUrl}/${selectedDate}`}
      ></iframe>
    </>
  );
};

export default Website;

export const getStaticPaths = async () => {
  return {
    paths: [],
    fallback: true,
  };
};

const dateSchema = () =>
  z.string().refine((x) => {
    const dates = x.split("-");
    return (
      dates.length === 3 &&
      dates.every((date) => z.coerce.number().safeParse(date).success)
    );
  });

const pathSchema = z.union([
  z.tuple([z.string().cuid()]),
  z.tuple([z.string().cuid(), dateSchema()]),
]);

type PathType = z.infer<typeof pathSchema>;

export const getStaticProps: GetStaticProps<Props> = async (context) => {
  // website/id/date
  const parseResult = await pathSchema.spa(context.params?.websiteId);
  if (!parseResult.success) {
    return NotFound;
  }
  const websiteId = parseResult.data;

  let dates: string[];
  try {
    dates = await readdir(
      path.join("/mnt/webarchive/new-archive", websiteId[0])
    );
  } catch (error) {
    console.error(error);
    return NotFound;
  }

  if (dates.length === 0) {
    return NotFound;
  }

  if (websiteId.length === 1) {
    return {
      props: {
        websiteId: websiteId[0],
        dates,
      },
    };
  }

  return {
    props: {
      websiteId: websiteId[0],
      selectedDate: websiteId[1],
      dates,
    },
  };
};
