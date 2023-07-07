import classNames from "classnames";
import Link from "next/link";
import type { FC } from "react";

export type ArchiveRecord = {
  date: string;
  href: string;
};

export type ArchivedTimelineProps = {
  times: ArchiveRecord[];
  activeDate: string;
};

export const ArchivedTimeline: FC<ArchivedTimelineProps> = ({
  times,
  activeDate,
}) => {
  return (
    <ol className="flex flex-auto flex-col items-center overflow-y-scroll pr-20 scrollbar-hide">
      <span className="h-2 w-2 flex-shrink-0 rounded-full bg-ar-collapse" />
      <span className="h-8 w-0.5 flex-shrink-0 bg-ar-collapse" />

      {times.map(({ date, href }, index) => (
        <div
          key={date}
          className="relative flex flex-col items-center justify-center"
        >
          {index !== 0 && (
            <span className="h-24 w-0.5 flex-shrink-0 bg-ar-collapse" />
          )}
          <Link href={href} className="relative flex flex-col items-center">
            <span
              className={classNames(
                "relative h-4 w-4 rounded-full border-2 border-ar-collapse",
                { "bg-ar-collapse": activeDate === date }
              )}
            />
            <span
              className={classNames(
                "absolute translate-x-12 whitespace-nowrap font-serif text-sm text-ar-collapse",
                { "border-b border-b-ar-collapse": activeDate === date }
              )}
            >
              {date}
            </span>
          </Link>
        </div>
      ))}
    </ol>
  );
};
